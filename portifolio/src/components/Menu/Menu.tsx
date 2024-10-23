import Link from "next/link";

export default function Menu() {
    return (

        <nav>
            <ul className="menu-items">
                <li> <Link href="/">Home</Link> </li>
                <li> <Link href="https://github.com/marcos3777/CP3_FRONT_RepositorioNotasFIAP">Projeto no Github</Link> </li>
            </ul>
        </nav>

    )
}
