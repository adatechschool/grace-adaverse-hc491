import { signout } from "@/src/db/lib/actions";

interface modalProps {
    onClose : () => void;
}



export default function ModalSignOut({onClose} : modalProps) {
    function onSignOut() {
    signout(); 
    onClose();

}
    return (
        <dialog open className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-96">
                <h2 className="text-xl font-bold mb-4">Voulez-vous vous déconnecter ?</h2>
            <div>
                <button onClick={() => onSignOut()}>Oui</button>
                <button onClick={() => onClose()}>Annuler</button>
            </div>
            </div>
        </dialog>
    )
}