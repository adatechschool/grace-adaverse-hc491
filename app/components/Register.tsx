import { signup } from "@/src/db/lib/actions";

interface RegisterProps {
    closeModal:() => void;
}

export default function Register({closeModal} : RegisterProps) {
    return (
        <div>
            <h1>Inscription</h1>
            <form onSubmit={() => closeModal()} action={signup}>
                <input name="name" type="text" required placeholder="Votre nom"></input>
                <input name="email" type="email" placeholder="Votre email" required></input>
                <input name="password" type="password" placeholder="Votre mot de passe" required></input>
                <button type="submit">M'inscrire</button>
                <button onClick={() => closeModal()}>Annuler</button>
            </form>
        </div>
    )
}