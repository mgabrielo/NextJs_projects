'use client';
import React from 'react'
import Container from '../Container'
import CategoryBox from '../CategoryBox';
import {TbBeach,TbPool ,TbMountain} from 'react-icons/tb';
import {GiWindmill,GiForestCamp,GiCastle,GiCactus, GiIsland,GiCaveEntrance, GiBarn, GiBoatFishing} from 'react-icons/gi'
import {MdOutlineVilla} from 'react-icons/md'
import {BsSnow} from 'react-icons/bs'
import {IoDiamond} from 'react-icons/io5'
import {FaSkiing} from 'react-icons/fa'
import { usePathname, useSearchParams } from 'next/navigation';

export const categories=[
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'this house is close to the beach'
    },
    {
        label: 'WindMills',
        icon: GiWindmill,
        description: 'this house is close to the windmill'
    },
    {
        label: 'Modern Home',
        icon: MdOutlineVilla,
        description: 'this house is close to the modern homes'
    },
    {
        label: 'CountrySide',
        icon: TbMountain,
        description: 'this house is close to the country side'
    },
    {
        label: 'Pool',
        icon: TbPool,
        description: 'this house is close to the pool side'
    },
    {
        label: 'Island',
        icon: GiIsland,
        description: 'this house is close to an Island'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'this house is close to a Lake'
    },
    {
        label: 'Ski',
        icon: FaSkiing,
        description: 'this house is close to a Skate Rink'
    },
    {
        label: 'Castle',
        icon: GiCastle,
        description: 'this house is close to a Castle'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'this house is close to a Camp Site'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'this house is close to a Snow region'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'this house is close to a Cave'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'this house is close to a Desert'
    },
    {
        label: 'Barn',
        icon: GiBarn,
        description: 'this house is close to a Barn'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'this house is close to a luxury resort'
    },
]


const Categories = () => {

    const params = useSearchParams()
    const category = params?.get('category')
    const pathname=usePathname();

    const isMainPage =pathname ==='/'
    if(!isMainPage){
        return null;
    }

  return (
  
    <Container>
        <div className='pt-4 flex flex-row justify-between items-center overflow-x-auto'>
            {categories.map((item)=>(
                <CategoryBox
                key={item.label}
                label={item.label}
                selected={category == item.label}
                icon={item.icon}
                />
            ))}
        </div>
    </Container>
  )
}

export default Categories