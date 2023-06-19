"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example1: string;
  example2: string;
  example3: number;
  example4: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  useEffect(() => {
    register("example1", {
      validate: (value) =>
        value.length >= 6 ||
        "input จะต้องมีความยาวมากกว่าหรือเท่ากับ 6 ตัวอักษร",
    });

    register("example2", {
      validate: (value) => {
        const strArray = [...value];

        for (let index = 0; index < strArray.length; index++) {
          if (index % 2 !== 0) {
            if (
              strArray[index - 1] === strArray[index] &&
              strArray[index + 1] === strArray[index]
            ) {
              return false || "input จะต้องกันไม่ให้มีเลขซ้ำติดกันเกิน 2 ตัว";
            }
          }
        }

        return true;
      },
    });

    register("example3", {
      validate: (value) => {
        const strArray = [...value];
        for (let index = 0; index < strArray.length; index++) {
          if (index % 2 !== 0) {
            if (
              strArray[index] - strArray[index - 1] === 1 &&
              strArray[index + 1] - strArray[index] === 1
            ) {
              return false || "input จะต้องกันไม่ให้มีเลขเรียงกันเกิน 2 ตัว";
            }
          }
        }
        return true;
      },
    });

    register("example4", {
      validate: (value) => {
        const strArray = [...value];
        let count = 0;
        for (let index = 0; index < strArray.length; index++) {
          if (index % 2 !== 0) {
            if (
              strArray[index - 1] === strArray[index] &&
              strArray[index + 1] !== strArray[index]
            ) {
              count = count + 1;
              if (count === 3) {
                return false || "input จะต้องกันไม่ให้มีเลขชุดซ้ำ เกิน 2 ชุด";
              }
            }
          }
        }
        return true;
      },
    });
  }, [register]);

  return (
    <div className="w-full max-w-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            1.input จะต้องมีความยาวมากกว่าหรือเท่ากับ 6 ตัวอักษร
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="example1"
            {...register("example1", { required: true })}
          />
          {errors.example1 && (
            <p className=" text-red-500 text-xs">{errors.example1?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            2.input จะต้องกันไม่ให้มีเลขซ้ำติดกันเกิน 2 ตัว
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="example2"
            {...register("example2", { required: true })}
          />
          {errors.example2 && (
            <p className=" text-red-500 text-xs">{errors.example2?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            3.input จะต้องกันไม่ให้มีเลขเรียงกันเกิน 2 ตัว
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="example3"
            {...register("example3", { required: true })}
          />
          {errors.example3 && (
            <p className=" text-red-500 text-xs">{errors.example3?.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            4.input จะต้องกันไม่ให้มีเลขชุดซ้ำ เกิน 2 ชุด
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="example4"
            {...register("example4", { required: true })}
          />
          {errors.example4 && (
            <p className=" text-red-500 text-xs">{errors.example4?.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Enter
          </button>
        </div>
      </form>
      {/* <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p> */}
    </div>
  );
}
