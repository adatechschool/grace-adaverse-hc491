import Header from "./components/Header";
import Formulaire from "./components/Formulaire";
import { db } from "@/src";
import {
  programmesTable,
  projectsTable,
  promotionsTable,
} from "@/src/db/schema";
import { desc, isNotNull } from "drizzle-orm";

export default async function Home() {

  const programmes = await db.select().from(programmesTable);
  const promotions = await db.select().from(promotionsTable);
  const projects = await db
    .select()
    .from(projectsTable)
    .where(isNotNull(projectsTable.publicationDate))
    .orderBy(desc(projectsTable.publicationDate));
    console.log(programmes);
    console.log(promotions,projects);
    
    
  return (
    <div>
      {programmes.map((programme,index) => {
        const projectfilter = projects.filter((p)=> p.programmeId==programme.id);
        
        console.log(projectfilter);
        
        return (
          <div key={index}>
            <h1>{programme.name}</h1>
            {projectfilter.map((project,index)=> {
              return (
                <div key={index}>
                  <h2>{project.title}</h2>
                  <p>{promotions.find((p)=>p.id==project.promotionId)?.name}</p>

                </div>
              )
            })}
          </div>
        );
      })}
    </div>
  );
}
// <div>
//     <Header openModal={handleOpenModal} />
//     {isModalOpen && (
//       <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//         <Formulaire
//           closeModal={handleCloseModal}
//           onSubmit={handleFormSubmit}
//         />
//       </div>
//     )}
//   </div>
