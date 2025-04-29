import { projects } from "@prisma/client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { useUpdateProject } from "../hooks/useUpdateProject"

const projectSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    status: z.enum(["WORKING", "DONE"]),
    repo: z.enum(["FRONTEND", "BACKEND"]),
    url: z.string().url("Invalid URL").optional(),
    liveLink: z.string().url("Invalid URL").optional(),
    gitFrontend: z.string().url("Invalid URL").optional(),
    gitBackend: z.string().url("Invalid URL").optional(),
})

type ProjectFormData = z.infer<typeof projectSchema>

export const ProjectUpdateModel = ({ project }: { project: projects }) => {
    const [isOpen, setIsOpen] = useState(false)
    const updateProject = useUpdateProject()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: project.name,
            description: project.description,
            status: project.status,
            repo: project.repo,
            url: project.url || "",
            liveLink: project.liveLink || "",
            gitFrontend: project.gitFrontend || "",
            gitBackend: project.gitBackend || "",
        },
    })

    const onSubmit = async (data: ProjectFormData) => {
        try {
            await updateProject.mutateAsync({ id: project.id, data })
            setIsOpen(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit Project</DialogTitle>
                    <DialogDescription>
                        Make changes to your project here. Click save when you re done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                {...register("name")}
                                placeholder="Project name"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select
                                value={watch("status")}
                                onValueChange={(value) => setValue("status", value as "WORKING" | "DONE")}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="WORKING">Working</SelectItem>
                                    <SelectItem value="DONE">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                {...register("description")}
                                placeholder="Project description"
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Repository Type</Label>
                            <Select
                                value={watch("repo")}
                                onValueChange={(value) => setValue("repo", value as "FRONTEND" | "BACKEND")}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select repository type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="FRONTEND">Frontend</SelectItem>
                                    <SelectItem value="BACKEND">Backend</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="url">Project URL</Label>
                            <Input
                                id="url"
                                {...register("url")}
                                placeholder="https://example.com"
                            />
                            {errors.url && (
                                <p className="text-sm text-red-500">{errors.url.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="liveLink">Live Link</Label>
                            <Input
                                id="liveLink"
                                {...register("liveLink")}
                                placeholder="https://example.com"
                            />
                            {errors.liveLink && (
                                <p className="text-sm text-red-500">{errors.liveLink.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gitFrontend">Frontend Repository</Label>
                            <Input
                                id="gitFrontend"
                                {...register("gitFrontend")}
                                placeholder="https://github.com/username/repo"
                            />
                            {errors.gitFrontend && (
                                <p className="text-sm text-red-500">{errors.gitFrontend.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gitBackend">Backend Repository</Label>
                            <Input
                                id="gitBackend"
                                {...register("gitBackend")}
                                placeholder="https://github.com/username/repo"
                            />
                            {errors.gitBackend && (
                                <p className="text-sm text-red-500">{errors.gitBackend.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={updateProject.isPending}>
                            {updateProject.isPending ? "Saving..." : "Save changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}