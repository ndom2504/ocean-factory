// Clean single implementation of PaymentClaimForm with inline group subtotals
// Previous corrupted/duplicated content has been removed.

'use client'

import { useState, Fragment } from 'react'
import { DocumentTextIcon, XMarkIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
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
      
      // Calcul automatique des taxes et totaux
      if (field === 'claimAmount' || field === 'taxRate5' || field === 'taxRate15') {
        const claim = claims[idx]
        let taxRate = 0
        if (claim.taxRate5) taxRate = 0.05
        else if (claim.taxRate15) taxRate = 0.15
        else taxRate = 0.14 // 14% par défaut si ni 5% ni 15%
        
        claims[idx].taxAmount = claim.claimAmount * taxRate
        claims[idx].totalToDate = claim.claimAmount + claims[idx].taxAmount
      }
      
      return { ...prev, claims }
    })
  }

  const addNewClaim = () => {
    const maxClaimNumber = Math.max(...form.claims.map(c => c.claimNumber), 0)
    const newClaimNumber = maxClaimNumber + 1
    const maxId = Math.max(...form.claims.map(c => c.id), 0)
    
    const newClaim: PaymentClaimItem = {
      id: maxId + 1,
      description: `Claim ${newClaimNumber} - Nouvelle réclamation`,
      claimNumber: newClaimNumber,
      claimAmount: 0,
      taxRate5: false,
      taxRate15: false,
      taxAmount: 0,
      totalToDate: 0,
      group: `CLAIM_${newClaimNumber}`,
      groupLabel: `Claim ${newClaimNumber}`
    }
    
    setForm(prev => ({
      ...prev,
      claimNumber: (newClaimNumber + 1).toString(), // Incrémente le numéro en en-tête
      claims: [...prev.claims, newClaim]
    }))
  }

  const removeClaim = (idx: number) => {
    setForm(prev => ({
      ...prev,
      claims: prev.claims.filter((_, i) => i !== idx)
    }))
  }

  const handleSave = () => {
    onSave(form)
    onClose()
  }

  const totalWO = form.claims.reduce((s, c) => s + c.claimAmount, 0)
  const totalTax = form.claims.reduce((s, c) => s + c.taxAmount, 0)
  const grandTotal = form.claims.reduce((s, c) => s + c.totalToDate, 0)
  
  // Calculs cumulatifs selon l'en-tête du document Ocean Factory
  const cumulative5TaxWO = form.claims.filter(c => c.taxRate5).reduce((s, c) => s + c.claimAmount, 0)
  const cumulative15TaxWO = form.claims.filter(c => c.taxRate15).reduce((s, c) => s + c.claimAmount, 0)
  const cumulative14TaxWO = form.claims.filter(c => !c.taxRate5 && !c.taxRate15).reduce((s, c) => s + c.claimAmount, 0)
  const cumulativeWOTax = cumulative5TaxWO + cumulative15TaxWO + cumulative14TaxWO
  
  const cumulative5Tax = form.claims.filter(c => c.taxRate5).reduce((s, c) => s + c.taxAmount, 0)
  const cumulative15Tax = form.claims.filter(c => c.taxRate15).reduce((s, c) => s + c.taxAmount, 0)
  const cumulative14Tax = form.claims.filter(c => !c.taxRate5 && !c.taxRate15).reduce((s, c) => s + c.taxAmount, 0)
  const cumulativeTax = cumulative5Tax + cumulative15Tax + cumulative14Tax
  
  const cumulativeTotal = cumulativeWOTax + cumulativeTax
  
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
                <div className="font-semibold">Summary sheet to Claim for Progress Payment - Claim No. <input aria-label="Claim number" title="Claim number" value={form.claimNumber} onChange={e=>setForm(f=>({...f,claimNumber:e.target.value}))} className="w-16 border-b border-gray-400 text-center outline-none" /></div>
                <div>PSPC Contract # <input aria-label="PSPC Contract number" title="PSPC Contract number" value={form.pspcContractNumber} onChange={e=>setForm(f=>({...f,pspcContractNumber:e.target.value}))} className="w-48 border-b border-gray-400 text-center outline-none" /></div>
              </div>
            </div>

            {/* Section Cumulative selon l'en-tête Ocean Factory */}
            <div className="grid grid-cols-2 gap-8 mb-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Cumulative (W/O tax)</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>5% tax claim cumulative W/O tx</span>
                    <span>{formatCurrency(cumulative5TaxWO)} $</span>
                  </div>
                  <div className="flex justify-between">
                    <span>15% tax claim cumulative W/O tx</span>
                    <span>{formatCurrency(cumulative15TaxWO)} $</span>
                  </div>
                  <div className="flex justify-between">
                    <span>14% tax claim cumulative W/O tx</span>
                    <span>{formatCurrency(cumulative14TaxWO)} $</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-1">
                    <span>Total W/O Tax</span>
                    <span>{formatCurrency(cumulativeWOTax)} $</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Cumulative Tax</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>5% tax rate cumulative</span>
                    <span>{formatCurrency(cumulative5Tax)} $</span>
                  </div>
                  <div className="flex justify-between">
                    <span>15% tax rate cumulative</span>
                    <span>{formatCurrency(cumulative15Tax)} $</span>
                  </div>
                  <div className="flex justify-between">
                    <span>14% tax rate cumulative</span>
                    <span>{formatCurrency(cumulative14Tax)} $</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-1">
                    <span>Total Tax</span>
                    <span>{formatCurrency(cumulativeTax)} $</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right mb-4">
              <div className="text-lg font-bold text-purple-700">
                Cumulative TOTAL to date: {formatCurrency(cumulativeTotal)} $
              </div>
            </div>

            <div className="border border-black text-xs">
              <div className="bg-gray-100 grid grid-cols-9 gap-1 p-2 border-b border-black font-semibold">
                <div className="col-span-4 text-center">DESCRIPTION</div>
                <div className="col-span-1 text-center">Claim #</div>
                <div className="col-span-1 text-center">Claim amount</div>
                <div className="col-span-1 text-center">Tax amount</div>
                <div className="col-span-1 text-center">Total to date</div>
                <div className="col-span-1 text-center">Actions</div>
              </div>

              {groups.map(group => {
                const groupClaims = form.claims.filter(c=>c.group===group)
                const groupLabel = groupClaims[0]?.groupLabel || group
                const groupTotal = groupClaims.reduce((s,c)=>s+c.claimAmount,0)
                const groupTotalWithTax = groupClaims.reduce((s,c)=>s+c.totalToDate,0)
                return (
                  <Fragment key={group}>
                    {groupClaims.map(claim => {
                      const idx = form.claims.findIndex(c=>c.id===claim.id)
                      return (
                        <div key={claim.id} className="grid grid-cols-9 gap-1 p-2 border-b border-gray-300 hover:bg-gray-50">
                          <div className="col-span-4">
                            <input 
                              aria-label="Description" 
                              title="Description" 
                              value={claim.description} 
                              onChange={e=>updateClaim(idx,'description',e.target.value)} 
                              className="w-full px-2 py-1 text-xs border-none bg-transparent focus:bg-white focus:border focus:border-blue-300 rounded" 
                            />
                          </div>
                          <div className="col-span-1 text-center">
                            <input 
                              type="number" 
                              aria-label="Claim #" 
                              title="Claim number" 
                              value={claim.claimNumber} 
                              onChange={e=>updateClaim(idx,'claimNumber',parseInt(e.target.value)||0)} 
                              className="w-full px-1 py-1 text-center text-xs border-none bg-transparent focus:bg-white focus:border focus:border-blue-300 rounded" 
                            />
                          </div>
                          <div className="col-span-1 text-right">
                            <div className="flex items-center justify-end">
                              <input 
                                type="number" 
                                step="0.01" 
                                aria-label="Claim amount" 
                                title="Claim amount" 
                                value={claim.claimAmount} 
                                onChange={e=>updateClaim(idx,'claimAmount',parseFloat(e.target.value)||0)} 
                                className="w-full px-1 py-1 text-right text-xs border-none bg-transparent focus:bg-white focus:border focus:border-blue-300 rounded" 
                              />
                              <span className="ml-1 text-xs">$</span>
                            </div>
                            {/* Affichage des checkboxes de taxe en dessous */}
                            <div className="flex justify-center space-x-1 mt-1">
                              <label className="flex items-center text-[10px]">
                                <input 
                                  type="checkbox" 
                                  checked={claim.taxRate5} 
                                  onChange={e=>{
                                    updateClaim(idx,'taxRate5',e.target.checked)
                                    if(e.target.checked) updateClaim(idx,'taxRate15',false)
                                  }} 
                                  className="w-3 h-3 mr-1" 
                                />
                                5%
                              </label>
                              <label className="flex items-center text-[10px]">
                                <input 
                                  type="checkbox" 
                                  checked={claim.taxRate15} 
                                  onChange={e=>{
                                    updateClaim(idx,'taxRate15',e.target.checked)
                                    if(e.target.checked) updateClaim(idx,'taxRate5',false)
                                  }} 
                                  className="w-3 h-3 mr-1" 
                                />
                                15%
                              </label>
                              <label className="flex items-center text-[10px]">
                                <input 
                                  type="checkbox" 
                                  checked={!claim.taxRate5 && !claim.taxRate15} 
                                  onChange={e=>{
                                    if(e.target.checked) {
                                      updateClaim(idx,'taxRate5',false)
                                      updateClaim(idx,'taxRate15',false)
                                    }
                                  }} 
                                  className="w-3 h-3 mr-1" 
                                />
                                14%
                              </label>
                            </div>
                          </div>
                          <div className="col-span-1 text-right">
                            <div className="flex items-center justify-end">
                              <span className="text-xs text-gray-600">{formatCurrency(claim.taxAmount)}</span>
                              <span className="ml-1 text-xs">$</span>
                            </div>
                          </div>
                          <div className="col-span-1 text-right">
                            <div className="flex items-center justify-end">
                              <span className="text-xs text-gray-600">{formatCurrency(claim.totalToDate)}</span>
                              <span className="ml-1 text-xs">$</span>
                            </div>
                          </div>
                          <div className="col-span-1 text-center">
                            <button 
                              onClick={() => removeClaim(idx)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded flex items-center justify-center"
                              title="Supprimer cette ligne"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                    <div className="bg-gray-200 grid grid-cols-9 gap-1 p-2 border-b border-black font-semibold">
                      <div className="col-span-4">Total {groupLabel}</div>
                      <div className="col-span-1" />
                      <div className="col-span-1 text-right">{formatCurrency(groupTotal)} $</div>
                      <div className="col-span-1" />
                      <div className="col-span-1 text-right">{formatCurrency(groupTotalWithTax)} $</div>
                      <div className="col-span-1" />
                    </div>
                  </Fragment>
                )
              })}
              
              {/* Bouton pour ajouter une nouvelle ligne */}
              <div className="bg-blue-50 grid grid-cols-9 gap-1 p-3 border-b border-black">
                <div className="col-span-9 text-center">
                  <button 
                    onClick={addNewClaim}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium flex items-center justify-center mx-auto"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Ajouter nouvelle réclamation
                  </button>
                </div>
              </div>
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