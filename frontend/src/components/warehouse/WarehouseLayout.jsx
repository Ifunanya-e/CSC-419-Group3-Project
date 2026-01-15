import { useState } from 'react';
import Sidebar from './Sidebar';
import NavBar from './navBar';

function WarehouseLayout({ children }) {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <Sidebar 
                isExpanded={isSidebarExpanded}
                setIsExpanded={setIsSidebarExpanded}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarExpanded ? 'lg:ml-64' : 'lg:ml-20'} ml-0`}>
                <NavBar 
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default WarehouseLayout;
