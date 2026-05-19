import React, { useState } from 'react'

import teacher1 from "../../assets/teachers/LokEkheang.jpg"
import teahcer2 from "../../assets/teachers/RinVityadaro.jpg"
import teacher3 from "../../assets/teachers/KyThida.jpg"
import teacher4 from "../../assets/teachers/KhemKhemrin.jpg"
import teacher5 from "../../assets/teachers/AtRotha.jpg"
import teacher6 from "../../assets/teachers/ChangSovatey.jpg"
import teacher7 from "../../assets/teachers/ChapVannakdet.png"
import teacher8 from "../../assets/teachers/ChhayPiseth.jpg"
import teacher9 from "../../assets/teachers/ChhonVannarong.jpg"
import teacher10 from "../../assets/teachers/HeangSokhy.jpg"
import teacher11 from "../../assets/teachers/HengSophon.jpg"
import teacher12 from "../../assets/teachers/HimSeanghon.jpg"
import teacher13 from "../../assets/teachers/HiSochea.jpg"
import teacher14 from "../../assets/teachers/HumVansoy.png"


const Teacher = () => {

    // Teacher Data
    const teacher = [
        {
            id: 1,
            image: teacher1,
            name: "លោក ឯក ហៀង",
            Position: "នាយក | អភិវឌ្ឍន៍សេដ្ឋកិច្ចកសិកម្ម"
        },
        {
            id: 2,
            image: teahcer2,
            name: "លោក រិន វិទ្យាដារ៉ូ",
            Position: "នាយករង | អក្សរសាស្រ្តអង់គ្លេស"
        },
        {
            id: 3,
            image: teacher3,
            name: "កញ្ញា គី ធីតា",
            Position: "នាយករង | គ្រប់គ្រងពាណិជ្ជកម្ម"
        },
        {
            id: 4,
            image: teacher4,
            name: "លោក ខឹម ខេមរិន្ទ",
            Position: "នាយករង | គ្រប់គ្រងពាណិជ្ជកម្ម"
        },
        {
            id: 5,
            image: teacher5,
            name: "អាត រដ្ឋា",
            Position: "គ្រូបច្ចេកទេស | គណិតវិទ្យា"
        },
        {
            id: 6,
            image: teacher6,
            name: "ឆាង សុវតី",
            Position: "គ្រូបច្ចេកទេស | ទីផ្សារ"
        },
        {
            id: 7,
            image: teacher7,
            name: "ចាប វណ្ណដែត",
            Position: "គ្រូបច្ចេកទេស | អគ្គិសនី"
        },
        {
            id: 8,
            image: teacher8,
            name: "ឆាយ ពិសិដ្ឋ",
            Position: "គ្រូបច្ចេកទេស | គ្រប់គ្រងកសិកម្ម"
        },
        {
            id: 9,
            image: teacher9,
            name: "ឆន វណ្ណារ៉ុង",
            Position: "គ្រូបច្ចេកទេស | គ្រប់គ្រងពាណិជ្ជកម្ម"
        },
        {
            id: 10,
            image: teacher10,
            name: "ហៀង សុខហ៊ី",
            Position: "គ្រូបច្ចេកទេស | វិទ្យាសាស្រ្តជលផល"
        },
        {
            id: 11,
            image: teacher11,
            name: "ហេង សុផន",
            Position: "គ្រូបច្ចេកទេស | យន្តសាស្ត្រទូទៅ"
        },
        {
            id: 12,
            image: teacher12,
            name: "ហ៊ឹម ស៊ាងហុន",
            Position: "គ្រូបច្ចេកទេស | ពត៌មានវិទ្យា"
        },

        {
            id: 13,
            image: teacher13,
            name: "ហ៊ឹម ស៊ាងហុន",
            Position: "គ្រូបច្ចេកទេស | ពត៌មានវិទ្យា"
        },
        {
            id: 14,
            image: teacher14,
            name: "ហ៊ឹម ស៊ាងហុន",
            Position: "គ្រូបច្ចេកទេស | ពត៌មានវិទ្យា"
        },
    ]

    // Pagination
    const itemsPerPage = 10
    const [currentPage, setCurrentPage] = useState(1)

    // Get Current Teachers
    const startIndex = (currentPage - 1) * itemsPerPage

    const currentTeachers = teacher.slice(
        startIndex,
        startIndex + itemsPerPage
    )

    // Total Pages
    const totalPages = Math.ceil(
        teacher.length / itemsPerPage
    )

    return (
        <div>

            {/* Header */}
            <div className='bg-primary'>
                <h1 className='text-2xl text-white xl:py-10 xl:text-4xl font-mono xl:px-40 xl:text-start md:text-start md:text-3xl md:px-4 text-center py-6 font-bold'>
                    Teachers
                </h1>
            </div>

            {/* Teacher Cards */}
            <div className='grid grid-cols-2 px-4 xl:px-40 xl:grid-cols-5 md:grid-cols-4 gap-1 p-3'>

                {currentTeachers.map((item) => (
                    <div
                        key={item.id}
                        className='border shadow-sm rounded-sm grid place-items-center p-2'
                    >

                        <img
                            className='w-44 h-56 object-cover'
                            src={item.image}
                            alt={item.name}
                        />

                        <h1 className='font-moul text-primary mt-2 text-lg text-center'>
                            {item.name}
                        </h1>

                        <p className='font-battambang text-center'>
                            {item.Position}
                        </p>

                    </div>
                ))}

            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-3 mt-8 mb-10">

                {/* Prev */}
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border px-4 py-2 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1

                    return (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded border
                            ${currentPage === page
                                    ? "bg-blue-600 text-white"
                                    : "text-blue-600 hover:bg-gray-100"
                                }`}
                        >
                            {page}
                        </button>
                    )
                })}

                {/* Next */}
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>

            </div>

        </div>
    )
}

export default Teacher