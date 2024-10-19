import Image from "next/image";
import Menu from "../Menu/Menu";
import imgLogo from "@/img/logo-produtos.jpg";

export default function Cabecalho() {
    return (
        <header className="cabecalho">
           <Image src={imgLogo} alt="Sacola" width={100} height={100} />
            <Menu />
        </header>
    )
}
