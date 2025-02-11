import React from 'react'
import "../styles.css";
import { useUser } from '../UserContext';
import { Panel } from './admin/panel';
import { Inventory } from './admin/inventory';

export const Admin = () => {
    const {usuario} = useUser();
    console.log(usuario);
    return (
        <>
          <section className='h-screen bg-gray-900 hidden lg:grid lg:grid-cols-[1fr_4fr_1fr]'>
            <Panel />
            <Inventory usuario={usuario} />
            <SuggestionsSection usuario={usuario} />
          </section>
    
          <section className='lg:hidden flex flex-col justify-between h-screen bg-gray-900'>
            <div className='grid grid-cols-[5fr_1fr]'>
              <SearchInput padding='p-3'/>
              <NotificationButton usuario={usuario}/>
            </div>
            <Feed usuario={usuario} />
            <MobileNavBar usuario={usuario}/>
          </section>
          </>
      )
    
}
