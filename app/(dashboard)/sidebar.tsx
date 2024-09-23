import { useSidebarContext } from "@/context/SidebarContext";
import { Button, Sidebar } from "flowbite-react";
import type { FC } from "react";
import { BiBuoy } from "react-icons/bi";
import {
  HiChartPie,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";

export const DashboardSidebar: FC = function () {
  const { isCollapsed } = useSidebarContext();

  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      collapsed={isCollapsed}
      id="sidebar"
      className={twMerge(
        "fixed inset-y-0 left-0 z-20 mt-16 flex h-full shrink-0 flex-col border-r border-gray-200 duration-75 dark:border-gray-700 lg:flex",
        isCollapsed && "hidden w-16",
      )}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/rastrear/#" icon={HiUser}>
            Rastrear
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Produtos
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Upgrade
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Documentação
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={BiBuoy}>
            Ajuda
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>

 
    </Sidebar>
  );
};
