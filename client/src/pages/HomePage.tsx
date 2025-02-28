// import { useState } from "react";
// import axios from "axios";
// import { backendURL } from "@/config";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { ModeToggle } from "@/components/mode-toggle";
// import { toast } from "sonner";
// import { Brain, Cpu, Bot, Sparkles, Send, Loader2 } from "lucide-react";
// import ReactMarkdown from "react-markdown";

// type LLMType = "gemini" | "deepseek" | "llama" | "huggingFace"; 

// interface LLMInfo {
//   name: string;
//   icon: React.ReactNode;
//   endpoint: string;
//   color: string;
// }

// export const HomePage = () => {
//   const [prompt, setPrompt] = useState("");
//   const [responses, setResponses] = useState<Record<LLMType, string>>({
//     gemini: "",
//     deepseek: "",
//     llama: "",
//     huggingFace: "",
//   });
//   const [loading, setLoading] = useState<Record<LLMType, boolean>>({
//     gemini: false,
//     deepseek: false,
//     llama: false,
//     huggingFace: false, 
//   });
//   const [activeTab, setActiveTab] = useState<LLMType>("gemini");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const llmModels: Record<LLMType, LLMInfo> = {
//     gemini: {
//       name: "Gemini",
//       icon: <Sparkles className="h-5 w-5" />,
//       endpoint: "gemini",
//       color: "bg-blue-100 dark:bg-blue-950 border-blue-200 dark:border-blue-900",
//     },
//     deepseek: {
//       name: "DeepSeek",
//       icon: <Brain className="h-5 w-5" />,
//       endpoint: "deepseek",
//       color: "bg-purple-100 dark:bg-purple-950 border-purple-200 dark:border-purple-900",
//     },
//     llama: {
//       name: "Llama",
//       icon: <Bot className="h-5 w-5" />,
//       endpoint: "llama",
//       color: "bg-amber-100 dark:bg-amber-950 border-amber-200 dark:border-amber-900",
//     },
//     huggingFace: { 
//       name: "Hugging Face",
//       icon: <Cpu className="h-5 w-5" />,
//       endpoint: "huggingFace",
//       color: "bg-green-100 dark:bg-green-950 border-green-200 dark:border-green-900",
//     },
//   };

//   const fetchResponse = async (model: LLMType) => {
//     if (!prompt.trim()) return;

//     setLoading((prev) => ({ ...prev, [model]: true }));

//     try {
//       const response = await axios.post(
//         `${backendURL}/api/v1/response/${llmModels[model].endpoint}`,
//         { prompt }
//       );

//       setResponses((prev) => ({
//         ...prev,
//         [model]: response.data,
//       }));
//     } catch (error: any) {
//       console.error(`Error fetching ${model} response:`, error);
//       toast(`Error fetching ${llmModels[model].name} response`);
//     } finally {
//       setLoading((prev) => ({ ...prev, [model]: false }));
//     }
//   };

//   const fetchOptimalResponse = async()=>{
//     if (!gemini || !deepseek || !llama || huggingFace) return;

//     try{
//       const response = await axios.post(`${backendURL}/api/v1/response/optimalResponse`)
//     }
//     catch(e){
//       console.error(e);
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!prompt.trim()) {
//       toast("Please enter a prompt before submitting");
//       return;
//     }

//     setIsSubmitting(true);

//     setResponses({
//       gemini: "",
//       deepseek: "",
//       llama: "",
//       huggingFace: "", 
//     });

//     const models: LLMType[] = ["gemini", "deepseek", "llama", "huggingFace"]; 
//     await Promise.all(models.map(fetchResponse));

//     setIsSubmitting(false);
//   };

//   const renderResponseContent = (model: LLMType) => {
//     if (loading[model]) {
//       return (
//         <div className="space-y-3">
//           <Skeleton className="h-4 w-3/4" />
//           <Skeleton className="h-4 w-full" />
//           <Skeleton className="h-4 w-5/6" />
//           <Skeleton className="h-4 w-2/3" />
//         </div>
//       );
//     }

//     if (!responses[model]) {
//       return (
//         <div className="text-muted-foreground text-center py-8">
//           No response yet. Submit a prompt to see results.
//         </div>
//       );
//     }

//     return (
//       <div className="prose prose-sm dark:prose-invert max-w-none">
//         <ReactMarkdown>{responses[model]}</ReactMarkdown>
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto py-8 px-4 md:px-6">
//       <header className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Multi Agent Conversational Hub</h1>
//           <p className="text-muted-foreground mt-1">
//             Compare responses from different large language models
//           </p>
//         </div>
//         <ModeToggle />
//       </header>

//       <form onSubmit={handleSubmit} className="mb-8">
//         <div className="flex flex-col space-y-4">
//           <div className="grid w-full gap-2">
//             <label htmlFor="prompt" className="text-sm font-medium">
//               Your Prompt
//             </label>
//             <textarea
//               id="prompt"
//               placeholder="Enter your prompt here..."
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//               disabled={isSubmitting}
//             />
//           </div>
//           <Button
//             type="submit"
//             className="w-full md:w-auto md:self-end"
//             disabled={isSubmitting || !prompt.trim()}
//           >
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Processing...
//               </>
//             ) : (
//               <>
//                 <Send className="mr-2 h-4 w-4" />
//                 Submit to All Models
//               </>
//             )}
//           </Button>
//         </div>
//       </form>

//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//         <div className="lg:col-span-1">
//           <div className="sticky top-4">
//             <h2 className="text-xl font-semibold mb-4">Models</h2>
//             <div className="flex flex-row lg:flex-col gap-2">
//               {(Object.keys(llmModels) as LLMType[]).map((model) => (
//                 <Button
//                   key={model}
//                   variant={activeTab === model ? "default" : "outline"}
//                   className="justify-start w-full"
//                   onClick={() => setActiveTab(model)}
//                 >
//                   <div className="flex items-center">
//                     {llmModels[model].icon}
//                     <span className="ml-2">{llmModels[model].name}</span>
//                   </div>
//                   {loading[model] && (
//                     <Loader2 className="ml-auto h-4 w-4 animate-spin" />
//                   )}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="lg:col-span-4">
//           <div className={`p-6 rounded-lg border ${llmModels[activeTab].color}`}>
//             <div className="flex items-center mb-4">
//               {llmModels[activeTab].icon}
//               <h2 className="text-xl font-semibold ml-2">
//                 {llmModels[activeTab].name} Response
//               </h2>
//             </div>
//             <div className="min-h-[300px]">
//               {renderResponseContent(activeTab)}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };





import { useState } from "react";
import axios from "axios";
import { backendURL } from "@/config";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "@/components/mode-toggle";
import { toast } from "sonner";
import { Brain, Cpu, Bot, Sparkles, Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

type LLMType = "gemini" | "deepseek" | "llama" | "huggingFace"; 

interface LLMInfo {
  name: string;
  icon: React.ReactNode;
  endpoint: string;
  color: string;
}

export const HomePage = () => {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState<Record<LLMType, string>>({
    gemini: "",
    deepseek: "",
    llama: "",
    huggingFace: "",
  });
  const [loading, setLoading] = useState<Record<LLMType, boolean>>({
    gemini: false,
    deepseek: false,
    llama: false,
    huggingFace: false, 
  });
  const [activeTab, setActiveTab] = useState<LLMType>("gemini");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [optimalResponse, setOptimalResponse] = useState("");
  const [isFetchingOptimal, setIsFetchingOptimal] = useState(false);

  const llmModels: Record<LLMType, LLMInfo> = {
    gemini: {
      name: "Gemini",
      icon: <Sparkles className="h-5 w-5" />,
      endpoint: "gemini",
      color: "bg-blue-100 dark:bg-blue-950 border-blue-200 dark:border-blue-900",
    },
    deepseek: {
      name: "DeepSeek",
      icon: <Brain className="h-5 w-5" />,
      endpoint: "deepseek",
      color: "bg-purple-100 dark:bg-purple-950 border-purple-200 dark:border-purple-900",
    },
    llama: {
      name: "Llama",
      icon: <Bot className="h-5 w-5" />,
      endpoint: "llama",
      color: "bg-amber-100 dark:bg-amber-950 border-amber-200 dark:border-amber-900",
    },
    huggingFace: { 
      name: "Hugging Face",
      icon: <Cpu className="h-5 w-5" />,
      endpoint: "huggingFace",
      color: "bg-green-100 dark:bg-green-950 border-green-200 dark:border-green-900",
    },
  };

  const fetchResponse = async (model: LLMType) => {
    if (!prompt.trim()) return;

    setLoading((prev) => ({ ...prev, [model]: true }));

    try {
      const response = await axios.post(
        `${backendURL}/api/v1/response/${llmModels[model].endpoint}`,
        { prompt }
      );

      setResponses((prev) => ({
        ...prev,
        [model]: response.data,
      }));
    } catch (error: any) {
      console.error(`Error fetching ${model} response:`, error);
      toast(`Error fetching ${llmModels[model].name} response`);
    } finally {
      setLoading((prev) => ({ ...prev, [model]: false }));
    }
  };

  const fetchOptimalResponse = async () => {
    if (!responses.gemini || !responses.deepseek || !responses.llama || !responses.huggingFace) {
      toast("All model responses are required to fetch the optimal response");
      return;
    }

    setIsFetchingOptimal(true);

    try {
      const response = await axios.post(`${backendURL}/api/v1/response/optimalResponse`, {
        prompt
      });

      setOptimalResponse(response.data);
    } catch (error: any) {
      console.error("Error fetching optimal response:", error);
      toast("Error fetching optimal response");
    } finally {
      setIsFetchingOptimal(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast("Please enter a prompt before submitting");
      return;
    }

    setIsSubmitting(true);

    setResponses({
      gemini: "",
      deepseek: "",
      llama: "",
      huggingFace: "", 
    });

    const models: LLMType[] = ["gemini", "deepseek", "llama", "huggingFace"]; 
    await Promise.all(models.map(fetchResponse));

    setIsSubmitting(false);
  };

  const renderResponseContent = (model: LLMType) => {
    if (loading[model]) {
      return (
        <div className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      );
    }

    if (!responses[model]) {
      return (
        <div className="text-muted-foreground text-center py-8">
          No response yet. Submit a prompt to see results.
        </div>
      );
    }

    return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown>{responses[model]}</ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Multi Agent Conversational Hub</h1>
          <p className="text-muted-foreground mt-1">
            Get responses from different large language models using a single prompt
          </p>
        </div>
        <ModeToggle />
      </header>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col space-y-4">
          <div className="grid w-full gap-2">
            <label htmlFor="prompt" className="text-sm font-medium">
              Your Prompt
            </label>
            <textarea
              id="prompt"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSubmitting}
            />
          </div>
          <Button
            type="submit"
            className="w-full md:w-auto md:self-end"
            disabled={isSubmitting || !prompt.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit to All Models
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Models</h2>
            <div className="flex flex-row lg:flex-col gap-2">
              {(Object.keys(llmModels) as LLMType[]).map((model) => (
                <Button
                  key={model}
                  variant={activeTab === model ? "default" : "outline"}
                  className="justify-start w-full"
                  onClick={() => setActiveTab(model)}
                >
                  <div className="flex items-center">
                    {llmModels[model].icon}
                    <span className="ml-2">{llmModels[model].name}</span>
                  </div>
                  {loading[model] && (
                    <Loader2 className="ml-auto h-4 w-4 animate-spin" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className={`p-6 rounded-lg border ${llmModels[activeTab].color}`}>
            <div className="flex items-center mb-4">
              {llmModels[activeTab].icon}
              <h2 className="text-xl font-semibold ml-2">
                {llmModels[activeTab].name} Response
              </h2>
            </div>
            <div className="min-h-[300px]">
              {renderResponseContent(activeTab)}
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={fetchOptimalResponse}
              disabled={!responses.gemini || !responses.deepseek || !responses.llama || !responses.huggingFace || isFetchingOptimal}
              className="w-full"
            >
              {isFetchingOptimal ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Fetching Optimal Response...
                </>
              ) : (
                "Get Optimal Response"
              )}
            </Button>
          </div>

          {optimalResponse && (
            <div className="mt-6 p-6 rounded-lg border bg-gray-100 dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4">Optimal Response</h2>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{optimalResponse}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};