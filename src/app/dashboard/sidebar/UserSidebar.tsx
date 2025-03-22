import { useRouter } from "next/navigation";

export const UserSidebar = ({ onSelectSection }: { onSelectSection: (section: string) => void; }) => {
    const router = useRouter();
    const menuItems = [
      { name: 'Sell a Product', path: '/' },
      { name: 'Profile Settings', path: '/profile' },
      { name: 'Purchase History', path: '/purchase-history' },
      { name: 'Manage Listings', path: '/listing' },
      { name: 'Sales History', path: '/sales-history' },
    ];
  
    const handleNavigation = (item: { name: string; path: string }) => {
      onSelectSection(item.name);
      router.push(`/dashboard/${item.path}`);
    };
  
    return (
      <aside className="lg:w-72 w-full bg-[#272727] text-white flex lg:flex-col flex-row items-center lg:items-start justify-start lg:min-h-screen lg:border-r border-gray-700 shadow-lg">
        <div className="hidden lg:block text-2xl font-bold p-6 text-center border-b border-gray-700 bg-[#272727] lg:w-full">
          User Panel
        </div>
        <ul className="flex lg:flex-col flex-row lg:space-y-4 lg:p-4 p-2 flex-grow">
          {menuItems.map((item, index) => (
            <li key={index} className="group w-full">
              <div
                className="cursor-pointer p-4 rounded-md hover:bg-yellow-500 flex items-center justify-between transition-colors duration-200"
                onClick={() => handleNavigation(item)}
              >
                <span className="group-hover:text-gray-100">{item.name}</span>
              </div>
              {index < menuItems.length - 1 && <hr className="border-gray-700 w-full" />}
            </li>
          ))}
        </ul>
      </aside>
    );
  };
