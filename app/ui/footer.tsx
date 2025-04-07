import Link from "next/link";
import { FOOTER_NAV} from '../configuration/wwurm';

export default function Footer() {
    return <>
            <footer>
                <section className="section"> 
                    <div className="footer-flex">
                        <nav className="flex-item-nav">
                            <ul className="list-footer" role="list">
                            {
                                FOOTER_NAV.map(({ name, url }) => <li key={name}><Link href={url}>{name}</Link></li>)
                            }
                            </ul>
                        </nav>                    
                        <div className="flex-item-copyright">(c)2022 <Link href="/impressum">Fruchtveredelung Geschwister Wurm</Link></div>
                    </div>    
                </section> 
            </footer>
            <div className="footer-spacer" style={{height: 20, background: "white"}}></div>
        </>;
}
    
                    