import Register from "./Register";

interface modalProps {
    onClose : () => void;
}

export default function ModalRegister({onClose} : modalProps) {
    return (
        <dialog open className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-96">
                <h2 className="text-xl font-bold mb-4">S'inscrire</h2>
                <Register 
                closeModal={onClose}/>
            </div>
        </dialog>
    )
}