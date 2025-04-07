import Link from 'next/link';

import Dropdown from '../ui-client/dropdown';
import { NAV, LOGO } from '../configuration/wwurm';
import SideCart from '../ui-client/cart-aside';
import BtnCart from '../ui-client/btn-cart';
import { getCategories } from '../actions/get-actions';

export default async function Header() {
  const categories = await getCategories();
  return (
    <>
      <section className='placeholder'></section> {/* To adjust page to be below fixed header */}
      <header>
        <section className="section">
          <div className="flex">
            <nav className='flex-item-home'>
              <Link href='/'>
                <img src={LOGO} alt="logo" className='img-brand' width="600" height="238"/>
              </Link>
            </nav>
            {/* <button> nav menu hidden for desktop
                <img src="images/icon-hamburger.svg" alt="" aria-hidden="true" />
                <img src="images/icon-close.svg" alt="" aria-hidden="true" />
                <span>Menu</span> 
            </button> */}
            <nav className="flex-item-shop">
              <ul className="list-products" role="list">
                <Dropdown list={categories} name={"Produkte"} /> 
                {
                  NAV.map(({ name, url }) => <li key={name}><Link href={url}>{name}</Link></li>)
                }
              </ul>
            </nav>
            <nav className="flex-item-user">
              <ul className="list-user" role="list">
                <li>
                  <Link href='register'>Anmelden</Link>
                </li>
                <li>
                  <BtnCart />
                </li>
              </ul>
            </nav>
          </div>
        </section>
        <SideCart />
      </header> 
    </>
  );
}
