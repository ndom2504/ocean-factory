'use client'

import React, { useState, useEffect } from 'react'
import { DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface ClaimItem {
  description: string
  taxRate: number
  amount: number
  tax: number
  total: number
}

interface PWGSC1111FormData {
  // Page 1 - En-tête et informations de base
  claimNumber: string
  date: string
  contractPrice: string
  
  // Informations entrepreneur
  contractorName: string
  contractorAddress: string
  contractorCity: string
  contractorPostal: string
  contractorPhone: string
  contractorEmail: string
  
  // Informations contrat
  fileNumber: string
  contractNumber: string
  contractSerial: string
  financialCoding: string
  
  // Numéros d'affaires
  contractorPBN: string
  contractorGST: string
  
  // Rapport de travail
  workProgressReport: string
  
  // Période de réclamation
  claimPeriodFrom: string
  claimPeriodTo: string
  
  // Tableau des réclamations
  claims: ClaimItem[]
  
  // Totaux calculés
  currentClaimSubtotal: number
  currentClaimTaxes: number
  currentClaimTotal: number
  previousClaimsSubtotal: number
  previousClaimsTaxes: number
  previousClaimsTotal: number
  totalToDateSubtotal: number
  totalToDateTaxes: number
  totalToDateTotal: number
  lessHoldbacks: number
  totalAmountClaim: number
  
  // Page 2 - Certifications
  contractorCertification: string
  contractorSignature: string
  contractorTitle: string
  contractorSignatureDate: string
  
  // Certification ministérielle
  inspectionCertification: string
  inspectionAuthoritySignature: string
  inspectionAuthorityTitle: string
  inspectionAuthorityDate: string
  
  // Autorité contractante
  contractingAuthorityCertification: string
  contractingAuthoritySignature: string
  contractingAuthorityTitle: string
  contractingAuthorityDate: string
  
  // Client final
  clientSignature: string
  clientTitle: string
  clientDate: string
  
  // Informations paiement
  chequeNumber: string
  chequeDate: string
  chequeAmount: string
}

interface PWGSC1111FormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: PWGSC1111FormData) => void
  initialData?: Partial<PWGSC1111FormData>
}

export default function PWGSC1111Form({ isOpen, onClose, onSave, initialData }: PWGSC1111FormProps) {
  const [form, setForm] = useState<PWGSC1111FormData>({
    // Page 1 - En-tête
    claimNumber: initialData?.claimNumber || '137',
    date: initialData?.date || '2025-10-05',
    contractPrice: initialData?.contractPrice || '$131,906,612.35',
    
    // Informations entrepreneur
    contractorName: initialData?.contractorName || 'Industries Ocean Inc.',
    contractorAddress: initialData?.contractorAddress || '105 Abraham-Martin',
    contractorCity: initialData?.contractorCity || 'Québec, QC G1K 8N1',
    contractorPostal: initialData?.contractorPostal || 'G1K 8N1',
    contractorPhone: initialData?.contractorPhone || '(418) 555-0123',
    contractorEmail: initialData?.contractorEmail || 'billing@oceanfactory.ca',
    
    // Informations contrat
    fileNumber: initialData?.fileNumber || 'Main',
    contractNumber: initialData?.contractNumber || '017mc W8472-185713',
    contractSerial: initialData?.contractSerial || 'WH472113001MC',
    financialCoding: initialData?.financialCoding || '2183GF V511 C.001339.03.02.05.02',
    
    // Numéros d'affaires
    contractorPBN: initialData?.contractorPBN || '100917178RT0001',
    contractorGST: initialData?.contractorGST || '100917178RT0001',
    
    // Rapport de travail
    workProgressReport: initialData?.workProgressReport || 'Industries Ocean project # C-230 - Milestone 7.3c Deckhouse and hull assembly complete and accepted by Canada',
    
    // Période de réclamation
    claimPeriodFrom: initialData?.claimPeriodFrom || '2025-09-01',
    claimPeriodTo: initialData?.claimPeriodTo || '2025-09-30',
    
    // Tableau des réclamations avec données réalistes
    claims: initialData?.claims || [
      {
        description: 'Previous Claims 1-136 - Progressive Payment',
        taxRate: 0,
        amount: 858717339.97,
        tax: 0,
        total: 858717339.97
      },
      {
        description: 'Current Claim 137 - Milestone 7.3c Deckhouse Assembly',
        taxRate: 15,
        amount: 16367155.59,
        tax: 2455073.34,
        total: 18822228.93
      }
    ],
    
    // Totaux calculés
    currentClaimSubtotal: 16367155.59,
    currentClaimTaxes: 2455073.34,
    currentClaimTotal: 18822228.93,
    previousClaimsSubtotal: 858717339.97,
    previousClaimsTaxes: 0,
    previousClaimsTotal: 858717339.97,
    totalToDateSubtotal: 875084495.56,
    totalToDateTaxes: 2455073.34,
    totalToDateTotal: 877539568.90,
    lessHoldbacks: 941111.45,
    totalAmountClaim: 17881117.48,
    
    // Page 2 - Certifications
    contractorCertification: 'I certify that the above claim is correct and that payment therefor has not been received. / Je certifie que la réclamation ci-dessus est exacte et que le paiement n\'a pas été reçu.',
    contractorSignature: '',
    contractorTitle: 'Chief Financial Officer',
    contractorSignatureDate: '',
    
    // Certification ministérielle
    inspectionCertification: 'I certify that the work described has been inspected and found to be in accordance with the contract specifications.',
    inspectionAuthoritySignature: '',
    inspectionAuthorityTitle: 'Project Inspector',
    inspectionAuthorityDate: '',
    
    // Autorité contractante
    contractingAuthorityCertification: 'I certify that this claim has been reviewed and approved for payment.',
    contractingAuthoritySignature: '',
    contractingAuthorityTitle: 'Contracting Authority',
    contractingAuthorityDate: '',
    
    // Client final
    clientSignature: '',
    clientTitle: 'Project Manager',
    clientDate: '',
    
    // Informations paiement
    chequeNumber: '',
    chequeDate: '',
    chequeAmount: ''
  })

  const [currentPage, setCurrentPage] = useState(1)

  // Fonctions de calcul
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount)
  }

  const updateClaim = (index: number, field: keyof ClaimItem, value: any) => {
    const newClaims = [...form.claims]
    newClaims[index] = { ...newClaims[index], [field]: value }
    
    // Recalculer automatiquement les taxes et totaux
    if (field === 'amount' || field === 'taxRate') {
      const amount = field === 'amount' ? parseFloat(value) || 0 : newClaims[index].amount
      const taxRate = field === 'taxRate' ? parseFloat(value) || 0 : newClaims[index].taxRate
      newClaims[index].tax = (amount * taxRate) / 100
      newClaims[index].total = amount + newClaims[index].tax
    }
    
    setForm(prev => ({ ...prev, claims: newClaims }))
    calculateTotals(newClaims)
  }

  const calculateTotals = (claims: ClaimItem[] = form.claims) => {
    // Séparer réclamation actuelle et précédentes
    const currentClaim = claims[claims.length - 1] || { amount: 0, tax: 0, total: 0 }
    const previousClaims = claims.slice(0, -1)
    
    // Calculs réclamation actuelle
    const currentClaimSubtotal = currentClaim.amount
    const currentClaimTaxes = currentClaim.tax
    const currentClaimTotal = currentClaim.total
    
    // Calculs réclamations précédentes
    const previousClaimsSubtotal = previousClaims.reduce((sum, claim) => sum + claim.amount, 0)
    const previousClaimsTaxes = previousClaims.reduce((sum, claim) => sum + claim.tax, 0)
    const previousClaimsTotal = previousClaims.reduce((sum, claim) => sum + claim.total, 0)
    
    // Totaux cumulatifs
    const totalToDateSubtotal = currentClaimSubtotal + previousClaimsSubtotal
    const totalToDateTaxes = currentClaimTaxes + previousClaimsTaxes
    const totalToDateTotal = currentClaimTotal + previousClaimsTotal
    
    // Montant final après retenues
    const finalAmount = currentClaimTotal - (form.lessHoldbacks || 0)
    
    setForm(prev => ({
      ...prev,
      currentClaimSubtotal,
      currentClaimTaxes,
      currentClaimTotal,
      previousClaimsSubtotal,
      previousClaimsTaxes,
      previousClaimsTotal,
      totalToDateSubtotal,
      totalToDateTaxes,
      totalToDateTotal,
      totalAmountClaim: finalAmount
    }))
  }

  const addClaimRow = () => {
    const newClaim: ClaimItem = {
      description: '',
      taxRate: 15,
      amount: 0,
      tax: 0,
      total: 0
    }
    setForm(prev => ({ ...prev, claims: [...prev.claims, newClaim] }))
  }

  const removeClaimRow = (index: number) => {
    if (form.claims.length > 1) {
      const newClaims = form.claims.filter((_, i) => i !== index)
      setForm(prev => ({ ...prev, claims: newClaims }))
      calculateTotals(newClaims)
    }
  }

  const updateField = (field: keyof PWGSC1111FormData, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
    
    // Recalculer si c'est le champ des retenues
    if (field === 'lessHoldbacks') {
      const finalAmount = form.currentClaimTotal - (parseFloat(value) || 0)
      setForm(prev => ({ ...prev, totalAmountClaim: finalAmount }))
    }
  }

  const handleSave = () => {
    onSave(form)
    onClose()
  }

  // Recalculer les totaux au chargement
  useEffect(() => {
    calculateTotals()
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-white rounded-lg shadow-xl w-[95vw] h-[95vh] max-w-7xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <div className="flex items-center space-x-3">
            <DocumentTextIcon className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Formulaire PWGSC-TPSGC 1111 - Page {currentPage}/2</h3>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentPage(currentPage === 1 ? 2 : 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Page {currentPage === 1 ? '2' : '1'}
            </button>
            <button 
              onClick={onClose} 
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div className="flex-1 overflow-auto">
          {currentPage === 1 ? (
            // PAGE 1 - FORMULAIRE PRINCIPAL
            <div className="p-6 space-y-6">
              
              {/* En-tête officiel */}
              <div className="text-center border-b pb-4">
                <h1 className="text-xl font-bold text-gray-800">PROGRESSIVE PAYMENT CLAIM</h1>
                <h2 className="text-lg font-bold text-gray-800">RÉCLAMATION DE PAIEMENT PROGRESSIF</h2>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
                  <span>PWGSC-TPSGC 1111 (2005-04)</span>
                  <span>Canada</span>
                </div>
              </div>

              {/* Informations de base */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Claim No. / N° de réclamation</label>
                  <input
                    type="text"
                    value={form.claimNumber}
                    onChange={(e) => updateField('claimNumber', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => updateField('date', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contract Price / Prix du contrat</label>
                  <input
                    type="text"
                    value={form.contractPrice}
                    onChange={(e) => updateField('contractPrice', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Informations entrepreneur */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 border-b">Contractor&apos;s Information / Informations de l&apos;entrepreneur</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Nom de l&apos;entreprise</label>
                    <input
                      type="text"
                      value={form.contractorName}
                      onChange={(e) => updateField('contractorName', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Adresse</label>
                    <input
                      type="text"
                      value={form.contractorAddress}
                      onChange={(e) => updateField('contractorAddress', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Ville, Province, Code postal</label>
                    <input
                      type="text"
                      value={form.contractorCity}
                      onChange={(e) => updateField('contractorCity', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Téléphone</label>
                      <input
                        type="tel"
                        value={form.contractorPhone}
                        onChange={(e) => updateField('contractorPhone', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value={form.contractorEmail}
                        onChange={(e) => updateField('contractorEmail', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 border-b">Contract Information / Informations du contrat</h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">File No. / N° de dossier</label>
                      <input
                        type="text"
                        value={form.fileNumber}
                        onChange={(e) => updateField('fileNumber', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Contract No. / N° du contrat</label>
                      <input
                        type="text"
                        value={form.contractNumber}
                        onChange={(e) => updateField('contractNumber', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Contract Serial No. / N° de série du contrat</label>
                    <input
                      type="text"
                      value={form.contractSerial}
                      onChange={(e) => updateField('contractSerial', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Financial Coding / Codification financière</label>
                    <input
                      type="text"
                      value={form.financialCoding}
                      onChange={(e) => updateField('financialCoding', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">PBN / NEA</label>
                      <input
                        type="text"
                        value={form.contractorPBN}
                        onChange={(e) => updateField('contractorPBN', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">GST No. / N° de TPS</label>
                      <input
                        type="text"
                        value={form.contractorGST}
                        onChange={(e) => updateField('contractorGST', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rapport de progression des travaux */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Contractor&apos;s Report of Work Progress / Compte rendu de l&apos;avancement des travaux par l&apos;entrepreneur
                </label>
                <textarea
                  value={form.workProgressReport}
                  onChange={(e) => updateField('workProgressReport', e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Décrivez l'avancement des travaux..."
                />
              </div>

              {/* Période de réclamation */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Période de réclamation - Du</label>
                  <input
                    type="date"
                    value={form.claimPeriodFrom}
                    onChange={(e) => updateField('claimPeriodFrom', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Au</label>
                  <input
                    type="date"
                    value={form.claimPeriodTo}
                    onChange={(e) => updateField('claimPeriodTo', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Tableau des réclamations */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Claims Table / Tableau des réclamations</h3>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border-b p-3 text-left text-sm font-medium">Description des travaux exécutés</th>
                        <th className="border-b p-3 text-center text-sm font-medium">Taux de taxe (%)</th>
                        <th className="border-b p-3 text-right text-sm font-medium">Montant ($)</th>
                        <th className="border-b p-3 text-right text-sm font-medium">Taxe ($)</th>
                        <th className="border-b p-3 text-right text-sm font-medium">Total ($)</th>
                        <th className="border-b p-3 text-center text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.claims.map((claim, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border-b p-2">
                            <textarea
                              value={claim.description}
                              onChange={(e) => updateClaim(index, 'description', e.target.value)}
                              className="w-full p-2 border border-gray-200 rounded text-sm resize-none"
                              rows={2}
                            />
                          </td>
                          <td className="border-b p-2 text-center">
                            <input
                              type="number"
                              value={claim.taxRate}
                              onChange={(e) => updateClaim(index, 'taxRate', e.target.value)}
                              className="w-20 p-2 border border-gray-200 rounded text-center text-sm"
                              min="0"
                              max="100"
                              step="0.01"
                            />
                          </td>
                          <td className="border-b p-2 text-right">
                            <input
                              type="number"
                              value={claim.amount}
                              onChange={(e) => updateClaim(index, 'amount', e.target.value)}
                              className="w-32 p-2 border border-gray-200 rounded text-right text-sm"
                              min="0"
                              step="0.01"
                            />
                          </td>
                          <td className="border-b p-2 text-right font-mono text-sm">
                            {formatCurrency(claim.tax)}
                          </td>
                          <td className="border-b p-2 text-right font-mono text-sm font-semibold">
                            {formatCurrency(claim.total)}
                          </td>
                          <td className="border-b p-2 text-center">
                            <button
                              onClick={() => removeClaimRow(index)}
                              className="text-red-500 hover:text-red-700 p-1"
                              disabled={form.claims.length <= 1}
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <div className="p-3 bg-gray-50 border-t">
                    <button
                      onClick={addClaimRow}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    >
                      Ajouter une ligne
                    </button>
                  </div>
                </div>
              </div>

              {/* Totaux */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Réclamation actuelle</h4>
                  <div className="space-y-1 text-sm">
                    <div>Sous-total: {formatCurrency(form.currentClaimSubtotal)}</div>
                    <div>Taxes: {formatCurrency(form.currentClaimTaxes)}</div>
                    <div className="font-semibold">Total: {formatCurrency(form.currentClaimTotal)}</div>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Réclamations précédentes</h4>
                  <div className="space-y-1 text-sm">
                    <div>Sous-total: {formatCurrency(form.previousClaimsSubtotal)}</div>
                    <div>Taxes: {formatCurrency(form.previousClaimsTaxes)}</div>
                    <div className="font-semibold">Total: {formatCurrency(form.previousClaimsTotal)}</div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Total à ce jour</h4>
                  <div className="space-y-1 text-sm">
                    <div>Sous-total: {formatCurrency(form.totalToDateSubtotal)}</div>
                    <div>Taxes: {formatCurrency(form.totalToDateTaxes)}</div>
                    <div className="font-semibold">Total: {formatCurrency(form.totalToDateTotal)}</div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Montant final</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <label className="block text-xs mb-1">Moins retenues:</label>
                      <input
                        type="number"
                        value={form.lessHoldbacks}
                        onChange={(e) => updateField('lessHoldbacks', parseFloat(e.target.value) || 0)}
                        className="w-full p-1 border border-gray-300 rounded text-sm"
                        step="0.01"
                      />
                    </div>
                    <div className="font-bold text-lg text-purple-800">
                      {formatCurrency(form.totalAmountClaim)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // PAGE 2 - CERTIFICATIONS
            <div className="p-6 space-y-6">
              
              {/* En-tête Page 2 */}
              <div className="text-center border-b pb-4">
                <h1 className="text-xl font-bold text-gray-800">CERTIFICATIONS</h1>
                <div className="text-xs text-gray-600 mt-2">
                  PWGSC-TPSGC 1111 - Page 2/2
                </div>
              </div>

              {/* Certification de l'entrepreneur */}
              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  CONTRACTOR&apos;S CERTIFICATE / CERTIFICAT DE L&apos;ENTREPRENEUR
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Certification Text / Texte de certification</label>
                    <textarea
                      value={form.contractorCertification}
                      onChange={(e) => updateField('contractorCertification', e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Je certifie que la réclamation ci-dessus est exacte..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Signature de l&apos;entrepreneur</label>
                      <input
                        type="text"
                        value={form.contractorSignature}
                        onChange={(e) => updateField('contractorSignature', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Signature électronique"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Titre / Title</label>
                      <input
                        type="text"
                        value={form.contractorTitle}
                        onChange={(e) => updateField('contractorTitle', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <input
                        type="date"
                        value={form.contractorSignatureDate}
                        onChange={(e) => updateField('contractorSignatureDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Certification de l'autorité d'inspection */}
              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  INSPECTION AUTHORITY CERTIFICATE / CERTIFICAT DE L&apos;AUTORITÉ D&apos;INSPECTION
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Certification Text / Texte de certification</label>
                    <textarea
                      value={form.inspectionCertification}
                      onChange={(e) => updateField('inspectionCertification', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Je certifie que les travaux décrits ont été inspectés..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Signature</label>
                      <input
                        type="text"
                        value={form.inspectionAuthoritySignature}
                        onChange={(e) => updateField('inspectionAuthoritySignature', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Titre / Title</label>
                      <input
                        type="text"
                        value={form.inspectionAuthorityTitle}
                        onChange={(e) => updateField('inspectionAuthorityTitle', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <input
                        type="date"
                        value={form.inspectionAuthorityDate}
                        onChange={(e) => updateField('inspectionAuthorityDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Certification de l'autorité contractante */}
              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  CONTRACTING AUTHORITY CERTIFICATE / CERTIFICAT DE L&apos;AUTORITÉ CONTRACTANTE
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Certification Text / Texte de certification</label>
                    <textarea
                      value={form.contractingAuthorityCertification}
                      onChange={(e) => updateField('contractingAuthorityCertification', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Je certifie que cette réclamation a été révisée..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Signature</label>
                      <input
                        type="text"
                        value={form.contractingAuthoritySignature}
                        onChange={(e) => updateField('contractingAuthoritySignature', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Titre / Title</label>
                      <input
                        type="text"
                        value={form.contractingAuthorityTitle}
                        onChange={(e) => updateField('contractingAuthorityTitle', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <input
                        type="date"
                        value={form.contractingAuthorityDate}
                        onChange={(e) => updateField('contractingAuthorityDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Approbation finale du client */}
              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  CLIENT FINAL APPROVAL / APPROBATION FINALE DU CLIENT
                </h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Signature du client</label>
                    <input
                      type="text"
                      value={form.clientSignature}
                      onChange={(e) => updateField('clientSignature', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Titre / Title</label>
                    <input
                      type="text"
                      value={form.clientTitle}
                      onChange={(e) => updateField('clientTitle', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <input
                      type="date"
                      value={form.clientDate}
                      onChange={(e) => updateField('clientDate', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Informations de paiement */}
              <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  PAYMENT INFORMATION / INFORMATIONS DE PAIEMENT
                </h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">N° de chèque</label>
                    <input
                      type="text"
                      value={form.chequeNumber}
                      onChange={(e) => updateField('chequeNumber', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date du chèque</label>
                    <input
                      type="date"
                      value={form.chequeDate}
                      onChange={(e) => updateField('chequeDate', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Montant du chèque</label>
                    <input
                      type="text"
                      value={form.chequeAmount}
                      onChange={(e) => updateField('chequeAmount', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder={formatCurrency(form.totalAmountClaim)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t bg-gray-50">
          <span className="text-sm text-gray-600">
            Formulaire PWGSC-TPSGC 1111 - Demande de paiement progressif - Page {currentPage}/2
          </span>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Fermer
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}