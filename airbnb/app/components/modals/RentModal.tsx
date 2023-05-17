'use client';
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import {toast} from 'react-hot-toast';
import { useRouter } from "next/navigation";

enum STEPS{
    CATEGORY=0,
    LOCATION=1,
    INFO=2,
    IMAGES=3,
    DESCRIPTION=4,
    PRICE=5
}

const RentModal = () => {
    const router = useRouter()
    const rentModal = useRentModal()
    const[step , setStep] = useState(STEPS.CATEGORY)
    const[isLoading , setIsLoading] = useState(false)

    const {register, handleSubmit, setValue, watch, formState:{errors}, reset} = useForm<FieldValues>({
        defaultValues:{
            category:'',
            location:null,
            guestCount:1,
            roomCount:1,
            bathroomCount:1,
            imageSrc:'',
            price:1,
            title:'',
            description:'',
        }
    })

    const category = watch('category');
    const location = watch('location');
    const guestCount =watch('guestCount')
    const roomCount =watch('roomCount')
    const bathroomCount =watch('bathroomCount')
    const imageSrc =watch('imageSrc')

    const Map =useMemo(()=>dynamic(()=> import('../Map'), {
        ssr:false
    }),[location]);

    const setCustomvalue = (id:string, value:any)=>{
        setValue(id, value,{
            shouldValidate:true,
            shouldDirty:true,
            shouldTouch:true,
        })
    }
    const onBack =()=>{
        setStep((value)=>value -1)
    }

    const onNext =()=>{
        setStep((value)=>value +1)
    }


    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        if(step !== STEPS.PRICE){
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data).then(()=>{
            toast.success('Listing Created !!')
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose()
        }).catch(()=>{
            toast.error('Something Went Wrong ')
        }).finally(()=>{
            setIsLoading(false)
        })
    }

    const actionLabel= useMemo(()=>{
        if(step == STEPS.PRICE){
            return 'Create';
        }
        return 'Next';
    },[step])

    const secondaryActionLabel = useMemo(()=>{
        if(step == STEPS.CATEGORY){
            return undefined;
        }
        return 'Back';
    },[step])

    let bodyContent =(
        <div className="flex flex-col gap-8">
            <Heading title="Which Best Describes Your Place" subtitle="Pick a Category"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item)=>(
                    <div key={item.label}>
                        <CategoryInput onClick={(category)=>setCustomvalue('category', category)}
                         selected={category == item.label} label={item.label} icon={item.icon}/>
                    </div>
                ))}
            </div>
        </div>
    )

    if(step == STEPS.LOCATION){
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading title="where is your place located?" subtitle="Lets Find You"/>
                <CountrySelect value={location} onChange={(value)=>setCustomvalue('location', value)} />
                <Map center={location?.latlng }/>
            </div>
        )
    }
    
    if(step == STEPS.INFO){
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading title="Share info about your place" subtitle="What amenities do you have"/> 
                
                <Counter title="Number of Guest" subtitle="How Many Guest Do you Allow ?"
                 value={guestCount} onChange={(value)=> setCustomvalue('guestCount', value)}/>
                <hr />
                <Counter title="Rooms" subtitle="How Many Rooms Do you Have ?"
                 value={roomCount} onChange={(value)=> setCustomvalue('roomCount', value)}/>
                <hr />
                <Counter title="Bathrooms" subtitle="How Many Bathrooms Do you Have ?"
                 value={bathroomCount} onChange={(value)=> setCustomvalue('bathroomCount', value)}/>
            </div>
        )
    }

    if(step == STEPS.IMAGES){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading title="Add a Photo of Your Place" subtitle="show us what your place looks like"/>
                <ImageUpload value={imageSrc} onChange={(value)=>setCustomvalue('imageSrc', value)}/>
            </div>
        )
    }

    if(step == STEPS.DESCRIPTION){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading title="How Would You Describe Your Place" subtitle="Short Details Would Be Nice"/>
                <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required/>
                <hr />
                <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required/>
            </div>
        )
    }

    if(step == STEPS.PRICE){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading title="Now Set Your Price" subtitle="How Much Do You Charge Per Night?"/>
                <Input id="price" label="Price" formatPrice={true} type="number" required disabled={isLoading} register={register} errors={errors}/>
            </div>
        )
    }

    return ( 
        <Modal isOpen={rentModal.isOpen} onClose={rentModal.onClose}
         secondaryAction={step == STEPS.CATEGORY ? undefined : onBack} secondaryActionLabel={secondaryActionLabel}
         onSubmit={handleSubmit(onSubmit)} actionLabel={actionLabel} title="AirBnb Your Home "
         body={bodyContent}/>
    );
}
 
export default RentModal;