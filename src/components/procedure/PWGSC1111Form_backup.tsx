'use client'

import React, { useState } from 'react'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

interface PWGSC1111FormData {
  contractNumber: string
  contractorName: string
  claimNumber: string
  claimPeriod: string
  claims: Array<{
    description: string
    amount: number
    tax: number
  }>
  subtotal: number
  applicableTaxes: number
  total: number
  lessHoldbacks: number
  totalAmountClaim: number
  currentClaimAmount: number
}

interface PWGSC1111FormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: PWGSC1111FormData) => void
  initialData?: Partial<PWGSC1111FormData>
}

export default function PWGSC1111Form({ isOpen, onClose, onSave, initialData }: PWGSC1111FormProps) {
  const [form, setForm] = useState<PWGSC1111FormData>({
    contractNumber: initialData?.contractNumber || '',
    contractorName: initialData?.contractorName || 'Ocean Factory Inc.',
    claimNumber: initialData?.claimNumber || '001',
    claimPeriod: initialData?.claimPeriod || 'Octobre 2024',
    claims: initialData?.claims || [
      { description: 'Milestone 1', amount: 45000, tax: 6750 },
      { description: 'Milestone 2', amount: 35000, tax: 5250 }
    ],
    subtotal: initialData?.subtotal || 80000,
    applicableTaxes: initialData?.applicableTaxes || 12000,
    total: initialData?.total || 92000,
    lessHoldbacks: initialData?.lessHoldbacks || 4600,
    totalAmountClaim: initialData?.totalAmountClaim || 87400,
    currentClaimAmount: initialData?.currentClaimAmount || 87400
  })

  const [currentPage, setCurrentPage] = useState(1)

  if (!isOpen) return null

  const updateField = (field: keyof PWGSC1111FormData, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave(form)
    onClose()
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-CA', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-white rounded-lg shadow-xl w-[95vw] h-[95vh] max-w-7xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <div className="flex items-center space-x-3">
            <DocumentTextIcon className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Formulaire PWGSC-TPSGC 1111 - Page {currentPage}/2</h3>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentPage(currentPage === 1 ? 2 : 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {currentPage === 1 ? 'Page 2' : 'Page 1'}
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          <div className="bg-white p-6 text-sm">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold">PROGRESSIVE PAYMENT CLAIM</h2>
              <h3 className="text-lg font-bold">DEMANDE DE PAIEMENT PROGRESSIF</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <strong>Contract No./N° de contrat:</strong>
                <input
                  type="text"
                  value={form.contractNumber}
                  onChange={(e) => updateField('contractNumber', e.target.value)}
                  className="ml-2 border border-gray-300 rounded px-2 py-1"
                />
              </div>
              
              <div>
                <strong>Contractor/Entrepreneur:</strong>
                <input
                  type="text"
                  value={form.contractorName}
                  onChange={(e) => updateField('contractorName', e.target.value)}
                  className="ml-2 border border-gray-300 rounded px-2 py-1"
                />
              </div>

              <div>
                <strong>Total Amount Claim/Montant total demandé:</strong>
                <span className="ml-2 font-bold">${formatCurrency(form.totalAmountClaim)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border-t bg-gray-50">
          <span>Formulaire PWGSC-TPSGC 1111 - Demande de paiement progressif</span>
          <div className="space-x-3">
            <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">Fermer</button>
            <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Sauvegarder</button>
          </div>
        </div>
      </div>
    </div>
  )
}