import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { ICardProps } from "../type/props";
import { FaCalendar, FaCar, FaHeart } from "react-icons/fa";
import { IoSpeedometer } from "react-icons/io5";
import { TbManualGearboxFilled } from "react-icons/tb";
import { BsFuelPumpFill } from "react-icons/bs";
import { VscColorMode } from "react-icons/vsc";
import { RiScales3Line } from "react-icons/ri";


export const Card: FC<ICardProps> = ({car}) => {

  return  (
    <div className="group rounded-xl overflow-hidden relative bg-white text-[#171717]">
      <div className="relative overflow-hidden pb-[50%] select-none">
        <Image
          src={car.images.image[0]}
          alt=""
          className='w-full h-full object-cover group-hover:scale-105 transition-all duration-500'
          sizes='100%'
          fill
        />
        <div className="absolute top-1 right-1 flex items-center gap-2">
          <button className='w-10 h-10 rounded-xl py-1 px-2 bg-[#ffffff] text-[#171717] flex items-center justify-center cursor-pointer' >
            <FaHeart className="w-5 h-5" />
          </button>
          <button className='w-10 h-10 rounded-xl py-1 px-2 bg-[#ffffff] text-[#171717] flex items-center justify-center  cursor-pointer' >
            <RiScales3Line className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="py-3 px-4">
        <h3 className="mb-2 text-lg font-bold truncate">
          {car.mark_cyrillic_name}
          {" "}
          {car.model_name}
        </h3>
        <p className="font-medium mb-1">{car.price.toLocaleString('ru-Ru')} &#8381;</p>
        <p className="mb-1 text-sm flex gap-2 items-center">
          <FaCar />
          <span>{car.modification_id}</span>
        </p>
        <div className="mb-1 flex items-center gap-2">
          <p className="flex items-center gap-2 text-sm">
            <IoSpeedometer className="w-3.5 h-3.5" />
            <span>{car.run.toLocaleString('ru-Ru')} км</span>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <TbManualGearboxFilled className="w-3.5 h-3.5" />
            <span>{car.gearbox}</span>
          </p>
        </div>
        <div className="mb-1 flex items-center gap-2">
          <p className="flex items-center gap-2 text-sm">
            <BsFuelPumpFill className="w-3.5 h-3.5" />
            <span>{car.engine_type}</span>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <VscColorMode className="w-3.5 h-3.5" />
            <span>{car.color}</span>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FaCalendar className="w-3.5 h-3.5" />
            <span>{car.year}</span>
          </p>
        </div>
      </div>
    </div>
  )
};