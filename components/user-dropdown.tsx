import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

const UserDropDown = () => {
  return (
    <div className="flex justify-center items-center gap-6">
      <div className="hidden md:flex justify-center items-center gap-6">
        <Button variant="primary" size="md" asChild>
          <Link href="/create-post">Create Post</Link>
        </Button>
        <Button size="md" variant="outline">
          Sign out
        </Button>
      </div>

      {/* DESKTOP */}
      <Link href="profile" className="hidden md:block">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
      </Link>

      {/* MOBILE */}
      <div className="block md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href="/profile">My profile</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/create-post">Create Post</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <Button variant="primary" size="sm">
              Sign out
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UserDropDown;
