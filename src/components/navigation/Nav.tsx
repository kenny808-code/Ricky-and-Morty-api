import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <div className="border-b shadow-sm bg-background">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Rick & Morty App</h1>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/characters">Characters</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/locations">Locations</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

        <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/episodes">Episodes</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}