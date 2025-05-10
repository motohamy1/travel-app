import NavItems from 'components/NavItems';
import React from 'react'
import {Outlet} from 'react-router';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import MobileSidebar from 'components/mobileSidebar';

const AdminLayout = () => {
    return (
        <div className='admin-layout'>
            <MobileSidebar/>
            <aside className='w-full max-w-[270] hidden lg:block'>
                <SidebarComponent width={270} enableGestures={false}>
                    <NavItems/>
                </SidebarComponent>
            </aside>
            <aside className='children'>
                <Outlet/>
            </aside>
        </div>
    )
}

export default AdminLayout