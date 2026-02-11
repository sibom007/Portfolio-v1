import Link from "next/link";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon, FolderGitIcon } from "lucide-react";

export function NoProject() {
  return (
    <Empty className="bg-background">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderGitIcon className="size-5" />
        </EmptyMedia>

        <EmptyTitle className="text-foreground text-xl">
          No Projects Yet
        </EmptyTitle>
      </EmptyHeader>

      <EmptyContent>
        <EmptyDescription>There are no projects yet.</EmptyDescription>
      </EmptyContent>

      <Button
        variant="link"
        asChild
        size="sm"
        className="text-muted-foreground">
        <Link href="#">
          Learn More <ArrowUpRightIcon className="ml-1 size-4" />
        </Link>
      </Button>
    </Empty>
  );
}
