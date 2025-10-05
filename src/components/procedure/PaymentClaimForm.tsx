// Clean single implementation of PaymentClaimForm with inline group subtotals
// Previous corrupted/duplicated content has been removed.

'use client'

import { useState, Fragment } from 'react'
import { DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { paymentClaimItems, PaymentClaimItem } from '../../data/paymentClaims'

// Local form-level data shape
export interface PaymentClaimData {
  claimNumber: string
  pspcContractNumber: string
  claims: PaymentClaimItem[]
}

export interface PaymentClaimFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: PaymentClaimData) => void
  initialData?: PaymentClaimData
}

// Dataset now imported from ../../data/paymentClaims as paymentClaimItems

const formatCurrency = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default function PaymentClaimForm({ isOpen, onClose, onSave, initialData }: PaymentClaimFormProps) {
  const [form, setForm] = useState<PaymentClaimData>(
    initialData || {
      claimNumber: '137',
      pspcContractNumber: '017mc.W8472-185713',
      claims: paymentClaimItems
    }
  )

  if (!isOpen) return null

  const updateClaim = (idx: number, field: keyof PaymentClaimItem, value: any) => {
    setForm(prev => {
      const claims = [...prev.claims]
      claims[idx] = { ...claims[idx], [field]: value }
      return { ...prev, claims }
    })
  }

  const handleSave = () => {
    onSave(form)
    onClose()
  }

  const totalWO = form.claims.reduce((s, c) => s + c.claimAmount, 0)
  const totalTax = form.claims.reduce((s, c) => s + c.taxAmount, 0)
  const grandTotal = form.claims.reduce((s, c) => s + c.totalToDate, 0)
  const groups = Array.from(new Set(form.claims.map(c => c.group)))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-white rounded-lg shadow-xl w-[95vw] h-[95vh] max-w-7xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <div className="flex items-center space-x-3">
            <DocumentTextIcon className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold">Payment Claim Form</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handleSave} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm">Sauvegarder</button>
            <button onClick={onClose} aria-label="Fermer le formulaire" title="Fermer" className="p-2 rounded-md hover:bg-gray-200 text-gray-500">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="border-2 border-black p-4 mb-6">
            <div className="flex justify-between items-start mb-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-blue-600">OCEAN</div>
                <div className="text-gray-600">GO FULL FORCE</div>
              </div>
              <div className="text-right space-y-1">
                <div className="font-semibold">Claim No. <input aria-label="Claim number" title="Claim number" value={form.claimNumber} onChange={e=>setForm(f=>({...f,claimNumber:e.target.value}))} className="w-16 border-b border-gray-400 text-center outline-none" /></div>
                <div>PSPC Contract # <input aria-label="PSPC Contract number" title="PSPC Contract number" value={form.pspcContractNumber} onChange={e=>setForm(f=>({...f,pspcContractNumber:e.target.value}))} className="w-48 border-b border-gray-400 text-center outline-none" /></div>
                <div className="pt-1 font-medium">Total W/O Tax: {formatCurrency(totalWO)} $</div>
                <div>Total Tax: {formatCurrency(totalTax)} $</div>
                <div className="font-bold text-purple-700">Grand Total: {formatCurrency(grandTotal)} $</div>
              </div>
            </div>

            <div className="border border-black text-xs">
              <div className="bg-gray-100 grid grid-cols-12 gap-1 p-2 border-b border-black font-semibold">
                <div className="col-span-4 text-center">DESCRIPTION</div>
                <div className="col-span-1 text-center">Claim #</div>
                <div className="col-span-2 text-center">Claim amount</div>
                <div className="col-span-1 text-center">5%</div>
                <div className="col-span-1 text-center">15%</div>
                <div className="col-span-1 text-center">Tax amount</div>
                <div className="col-span-2 text-center">Total to date</div>
              </div>

              {groups.map(group => {
                const groupClaims = form.claims.filter(c=>c.group===group)
                const groupLabel = groupClaims[0]?.groupLabel || group
                const groupTotal = groupClaims.reduce((s,c)=>s+c.claimAmount,0)
                return (
                  <Fragment key={group}>
                    {groupClaims.map(claim => {
                      const idx = form.claims.findIndex(c=>c.id===claim.id)
                      return (
                        <div key={claim.id} className="grid grid-cols-12 gap-1 p-2 border-b border-gray-300">
                          <div className="col-span-4">
                            <input aria-label="Description" title="Description" value={claim.description} onChange={e=>updateClaim(idx,'description',e.target.value)} className="w-full px-1 py-1 border border-gray-300 rounded" />
                          </div>
                          <div className="col-span-1 text-center">
                            <input type="number" aria-label="Claim #" title="Claim number" value={claim.claimNumber} onChange={e=>updateClaim(idx,'claimNumber',parseInt(e.target.value)||0)} className="w-full px-1 py-1 text-center border border-gray-300 rounded" />
                          </div>
                          <div className="col-span-2 text-right">
                            <input type="number" step="0.01" aria-label="Claim amount" title="Claim amount" value={claim.claimAmount} onChange={e=>updateClaim(idx,'claimAmount',parseFloat(e.target.value)||0)} className="w-full px-1 py-1 text-right border border-gray-300 rounded" />
                            <span className="ml-1">$</span>
                          </div>
                          <div className="col-span-1 text-center space-y-0.5">
                            <input type="checkbox" aria-label="Tax rate 5%" title="Tax rate 5%" checked={claim.taxRate5} onChange={e=>updateClaim(idx,'taxRate5',e.target.checked)} className="w-4 h-4" />
                            {claim.taxRate5 && <div className="text-[10px] leading-none">5%</div>}
                          </div>
                          <div className="col-span-1 text-center space-y-0.5">
                            <input type="checkbox" aria-label="Tax rate 15%" title="Tax rate 15%" checked={claim.taxRate15} onChange={e=>updateClaim(idx,'taxRate15',e.target.checked)} className="w-4 h-4" />
                            {claim.taxRate15 && <div className="text-[10px] leading-none">15%</div>}
                          </div>
                          <div className="col-span-1 text-right">
                            <input type="number" step="0.01" aria-label="Tax amount" title="Tax amount" value={claim.taxAmount} onChange={e=>updateClaim(idx,'taxAmount',parseFloat(e.target.value)||0)} className="w-full px-1 py-1 text-right border border-gray-300 rounded" />
                            <span className="ml-1">$</span>
                          </div>
                          <div className="col-span-2 text-right">
                            <input type="number" step="0.01" aria-label="Total to date" title="Total to date" value={claim.totalToDate} onChange={e=>updateClaim(idx,'totalToDate',parseFloat(e.target.value)||0)} className="w-full px-1 py-1 text-right border border-gray-300 rounded" />
                            <span className="ml-1">$</span>
                          </div>
                        </div>
                      )
                    })}
                    <div className="bg-gray-200 grid grid-cols-12 gap-1 p-2 border-b border-black font-semibold">
                      <div className="col-span-4">Total {groupLabel}</div>
                      <div className="col-span-1" />
                      <div className="col-span-2 text-right">{formatCurrency(groupTotal)} $</div>
                      <div className="col-span-1" />
                      <div className="col-span-1" />
                      <div className="col-span-1" />
                      <div className="col-span-2" />
                    </div>
                  </Fragment>
                )
              })}
            </div>
          </div>
        </div>

        <div className="border-t px-6 py-4 bg-gray-50 flex items-center justify-between text-sm">
          <span>Formulaire Payment Claim - Ocean Factory (totaux par groupe)</span>
          <div className="space-x-3">
            <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">Fermer</button>
            <button onClick={handleSave} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">Sauvegarder</button>
          </div>
        </div>
      </div>
    </div>
  )
}