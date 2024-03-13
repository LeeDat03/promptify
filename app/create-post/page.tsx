import FormPrompt from "@/components/form-prompt";

const CreatePrompt = () => {
  return (
    <div className="mt-14 self-start">
      <div className="mb-8">
        <h2 className="blue_gradient md:text-6xl text-4xl font-satoshi font-bold text-destructive-foreground">
          Create Prompt
        </h2>
        <p className="desc">
          Create and share amazing prompts with the world, and let your
          imagination run wild with any AI-powered platform.
        </p>
      </div>

      {/* TODO: FORM */}
      <div className="rounded-xl border border-gray-200 bg-white/20 backdrop-blur md:p-6 p-4 mb-10">
        <FormPrompt />
      </div>
    </div>
  );
};

export default CreatePrompt;
