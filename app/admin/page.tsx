import { auth } from "@/auth"; 
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/src";
import { projectsTable, user } from "@/src/db/schema";
import { eq, isNull } from "drizzle-orm";
import BouttonPublier from "../components/module/buttonPublier";
import Link from "next/link";


export default async function Admin() {

    // On récupère la session, on check l'id pour voir si l'user est admin
    const session = await auth.api.getSession({headers: await headers()});
    const userSession = session?.session.userId as string;
    const adminStatus = await db.select().from(user).where(eq(user.id, userSession));

    // Sinon, redirection vers la home
    if (!session?.user || !adminStatus[0].admin) {
        redirect("/")
    }

    // On va chercher nos projets non publiés
    const projetsNonPublies = await db.select().from(projectsTable).where(isNull(projectsTable.publicationDate))

    return (
        <div>
            {projetsNonPublies.length === 0 ? (
                <div>
                    <h1>Pas de projets à publier</h1>
                    <Link href="/">Retour à l'accueil</Link>
                </div>
                ) 
                : (
                <div>
            {projetsNonPublies.map((project, index) => {
                return(
                    <div key={index}>
                        <h1>{project.title}</h1>
                        <a href={`${project.gitHubLink}`}>{project.gitHubLink}</a>
                        <BouttonPublier 
                            project = {project}
                        />
                    </div>
                )
            })}
            </div>)}
            
        </div>
    )

}