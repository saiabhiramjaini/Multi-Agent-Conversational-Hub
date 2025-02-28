import express from 'express';
import { getDeepseekResponse, getGeminiResponse, getLlamaResponse, getHuggingFaceResponse, getOptimalResponse } from '../controllers/aiControllers';
const aiRouters = express.Router();

aiRouters.post("/gemini", getGeminiResponse)
aiRouters.post("/deepseek", getDeepseekResponse)
aiRouters.post("/llama", getLlamaResponse)
aiRouters.post("/huggingFace", getHuggingFaceResponse)
aiRouters.post("/optimalResponse", getOptimalResponse)

export default aiRouters;