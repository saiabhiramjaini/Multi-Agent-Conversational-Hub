import { Request, Response } from "express";
import axios from "axios";
require("dotenv").config();

export const getGeminiResponse = async (req: Request, res: Response): Promise<any> => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ msg: "Prompt is required" });
        }

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "google/gemini-2.0-flash-lite-preview-02-05:free",
                messages: [{ role: "user", content: prompt + "In a proper markdown format" }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return res.status(200).json(response.data.choices[0].message.content);
    } catch (e: any) {
        console.error(e);
        return res.status(500).json({ msg: "Internal Server Error", error: e.message });
    }
};


export const getDeepseekResponse = async (req: Request, res: Response): Promise<any> => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ msg: "Prompt is required" });
        }

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "deepseek/deepseek-r1-distill-llama-70b:free",
                messages: [{ role: "user", content: prompt+ "In a proper markdown format"  }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return res.status(200).json(response.data.choices[0].message.content);
    } catch (e: any) {
        console.error(e);
        return res.status(500).json({ msg: "Internal Server Error", error: e.message });
    }
};


export const getLlamaResponse = async (req: Request, res: Response): Promise<any> => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ msg: "Prompt is required" });
        }

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "meta-llama/llama-3.3-70b-instruct:free",
                messages: [{ role: "user", content: prompt+ "In a proper markdown format"  }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return res.status(200).json(response.data.choices[0].message.content);
    } catch (e: any) {
        console.error(e);
        return res.status(500).json({ msg: "Internal Server Error", error: e.message });
    }
};


export const getHuggingFaceResponse = async (req: Request, res: Response): Promise<any> => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ msg: "Prompt is required" });
        }

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "huggingfaceh4/zephyr-7b-beta:free",
                messages: [{ role: "user", content: prompt + "In a proper markdown format" }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return res.status(200).json(response.data.choices[0].message.content);
    } catch (e: any) {
        console.error(e);
        return res.status(500).json({ msg: "Internal Server Error", error: e.message });
    }
};



export const getOptimalResponse = async (req: Request, res:Response):Promise<any> => {
    try {
    //   const { gemini, deepseek, llama, huggingFace } = req.body;
  
    //   if (!gemini || !deepseek || !llama || !huggingFace) {
    //     return res.status(400).json({ msg: "All model responses are required" });
    //   }
    // const combinedPrompt = `Gemini: ${gemini}\nDeepSeek: ${deepseek}\nLlama: ${llama}\nHugging Face: ${huggingFace}\nPlease summarize in an optimal way in a proper markdown format.`;

        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ msg: "Prompt is required" });
        }
      
  
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "google/gemini-2.0-pro-exp-02-05:free",
          messages: [{ role: "user", content: prompt + "Generate an Optimal response in a summarized form" }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      return res.status(200).json(response.data.choices[0].message.content);
    } catch (e: any) {
      console.error(e);
      return res.status(500).json({ msg: "Internal Server Error", error: e.message });
    }
  };