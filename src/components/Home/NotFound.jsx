'use client'
import React from 'react'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
    <div className="text-center">
      <p className="font-moul text-9xl font-bold text-primary/20 mb-2">404</p>
      <h2 className="font-moul text-2xl text-gray-700 mb-3">ទំព័រនេះមិនមាន</h2>
      <p className="font-battambang text-gray-500 mb-8 text-sm leading-relaxed">
        សូមអភ័យទោស! ទំព័រដែលអ្នកកំពុងស្វែងរក<br />មិនមាន ឬត្រូវបានផ្លាស់ប្ដូរ
      </p>
      <Link href="/">
        <button className="bg-primary text-white font-battambang px-8 py-3 rounded-lg hover:bg-blue-900 transition-all inline-flex items-center gap-2">
          <FiArrowLeft /> ត្រឡប់ទំព័រដើម
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
