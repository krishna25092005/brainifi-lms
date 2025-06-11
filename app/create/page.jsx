"use client"
import React, { useState } from 'react'
import SelectOption from './_components/SelectOption'
import TopicInput from './_components/TopicInput';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import { Loader, ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Alert from '../../components/ui/Alert';
import Button from '../../components/ui/Button';

function Create() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState([])
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {user}=useUser();
    const handleUserInput=(fieldName, fieldValue)=>{
        setFormData(prev=>({
            ...prev,
            [fieldName]: fieldValue
        }))
    }
    
    console.log("Form Data:", formData);
    console.log("User Email:", user?.primaryEmailAddress?.emailAddress);

    const [error, setError] = useState(null);

    const GenerateCourseOutline = async () => {
      try {
        // Reset any previous errors
        setError(null);
        
        // Validate input fields
        if (!formData.studyType || !formData.topic) {
          setError("Please fill in all required fields");
          return;
        }

        const courseId = uuidv4();
        setLoading(true);
        const payload = {
          courseId,
          courseType: formData.studyType,
          topic: formData.topic,
          difficultyLevel: formData.difficultyLevel || "Medium",
          createdBy: user?.primaryEmailAddress?.emailAddress,
        };

        console.log("Payload being sent:", payload);

        const result = await axios.post(
          "/api/generate-course-outline",
          payload
        );

        console.log("API Response:", result.data.result);
        setLoading(false);
        router.replace('/dashboard');
      } catch (error) {
        console.error(
          "Error generating course outline:",
          error?.response?.data || error.message
        );
        setLoading(false);
        
        // Set error message for display
        const errorMessage = error?.response?.data?.error || 
                            "Failed to generate course outline. Please try again later.";
        setError(errorMessage);
      }
    }

  return (
    <div className='flex flex-col items-center h-screen p-5 md:px-24 lg:px-36'>
        <h2 className='text-4xl font-bold text-primary dark:text-blue-400'>Start Building Your Personal Study Material</h2>
        <p className='text-lg text-gray-500 dark:text-gray-400'>Fill all the details in order to generate study material for your next project</p>
        
        {/* Display error if exists */}
        {error && (
          <div className="w-full mt-4">
            <Alert 
              title="Course Generation Error" 
              message={error}
              type="error" 
              onClose={() => setError(null)} 
            />
          </div>
        )}
        
        <div className='w-full mt-10'>
            {step==0? <SelectOption selectedStudyType={(value)=>handleUserInput("studyType",value)}/> : <TopicInput setTopic={(value)=>handleUserInput("topic", value)} setDifficultyLevel={(value)=>handleUserInput("difficultyLevel", value)}/>}
        </div>
        <div className="flex justify-between w-full mt-32">
          {step !== 0 ? (
            <Button 
              variant="primary" 
              onClick={() => setStep(step-1)}
              icon={<ArrowLeft size={16} />}
              data-suppress-hydration-warning
            >
              Previous
            </Button>
          ) : (
            <span className="text-transparent">-</span>
          )}
          
          {step === 0 ? (
            <Button 
              variant="outline" 
              onClick={() => setStep(step+1)}
              icon={<ArrowRight size={16} />}
              data-suppress-hydration-warning
            >
              Next
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={GenerateCourseOutline} 
              loading={loading}
              disabled={loading}
              data-suppress-hydration-warning
            >
              Generate
            </Button>
          )}
        </div>
    </div>
  )
}

export default Create