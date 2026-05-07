"use client"
import { bannir } from "@/src/db/lib/adminActions";
import { useState } from "react";

interface UserProps {
    usersBannis : 
    {id: string,
    name: string,
    admin : boolean,
    email: string,
    emailVerified: boolean,
    banned: boolean,
    createdAt: Date,
    updatedAt: Date}[],

    usersPasBannis: 
    {id: string,
    name: string,
    admin : boolean,
    email: string,
    emailVerified: boolean,
    banned: boolean,
    createdAt: Date,
    updatedAt: Date}[]
}

export default function BanUsers({usersBannis, usersPasBannis} : UserProps) {
    const [selectId, setSelectId] = useState("")

    return (
    <div>
        <h2>Utilisateurs bannis</h2>
            <div>
                {usersBannis.map((user, index) => {
                    return (
                        <div key={index}>
                            <span>{user.name}</span>
                            <button>Débannir</button>
                        </div>
                    )
                })}
            </div>
            <div>
                <h2>Bannir un utilisateur</h2>
                    <select onChange={(e) => setSelectId(e.target.value) }>
                        <option>Choisissez un utilisateur à bannir</option>
                        {usersPasBannis.map((user, index) => {
                            return (
                                <option key={index} value={user.id}>{user.name}</option>
                            )
                         })}
                    </select>
                    <button onClick={() => bannir(selectId)}>Bannir</button>
        </div>
        </div>)

}