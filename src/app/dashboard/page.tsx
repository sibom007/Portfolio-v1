
import ProjectForm from "@/Modules/dashboard/project/components/ProjectForm";
import ProjectList from "@/Modules/dashboard/project/components/ProjectList";

const DashboardPage = () => {
    return (
        <div>
            {/* project form  */}
            <section>
                <h1 className="text-3xl font-bold text-white mb-4 text-center">Project form</h1>
                <ProjectForm />
            </section>

            {/* project list  */}
            <section>
                <h1 className="text-3xl font-bold text-white mb-4 text-center">Project list</h1>
                <ProjectList />
            </section>

        </div>
    );
};


export default DashboardPage;