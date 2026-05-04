import { signin } from "@/src/db/lib/actions";

interface SigninProps {
    closeModal:() => void;
}

export default function SignIn({closeModal} : SigninProps) {
    return (
        <div>
            <h1>Connexion</h1>
            <form onSubmit={() => closeModal()} action={signin}>
                <input name="email" type="email" placeholder="Votre email" required></input>
                <input name="password" type="password" placeholder="Votre mot de passe" required></input>
                <button type="submit">Me connecter</button>
                <button onClick={() => closeModal()}>Annuler</button>
            </form>
        </div>
    )
}