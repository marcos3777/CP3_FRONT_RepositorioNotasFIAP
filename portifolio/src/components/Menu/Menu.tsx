import Link from "next/link";
import Image from "next/image";

import { logofiap } from "@/public/fiap.png"

export default function Menu() {
    return (
            <Link href="/portifolio/src/app/page.tsx"><Image>{logofiap}</Image></Link>
    )
}
