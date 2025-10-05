'use client'

import { useState } from 'react'

interface DCRDetail {
  id: number
  numeroEtape: string
  description: string
  pourcentage: number
  prixUnitaireFerme: number
  prixFermeTotal: number
  facture: boolean // Nouveau champ pour le statut facturé
}

interface ProjectBilling {
  id: number
  c228: number
  c229: number
  c230: number
  c231: number
}

const initialDCRs: DCRDetail[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  numeroEtape: `DCR-${String(i + 1).padStart(3, '0')}`,
  description: `DCR ${i + 1} description`,
  pourcentage: 0,
  prixUnitaireFerme: 0,
  prixFermeTotal: 0,
  facture: false,
}))

const initialBillingBeforeTax: ProjectBilling[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  c228: 0,
  c229: 0,
  c230: 0,
  c231: 0,
}))

const initialBillingWithTax: ProjectBilling[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  c228: 0,
  c229: 0,
  c230: 0,
  c231: 0,
}))

export default function DCRDetails() {
  const [dcrs, setDCRs] = useState<DCRDetail[]>(initialDCRs)
  const [billingBeforeTax, setBillingBeforeTax] = useState<ProjectBilling[]>(initialBillingBeforeTax)
  const [billingWithTax, setBillingWithTax] = useState<ProjectBilling[]>(initialBillingWithTax)

  // Fonction de formatage de devise
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Calculs des totaux du contrat DCR
  const totalContractBeforeTax = dcrs.reduce((sum, dcr) => sum + dcr.prixFermeTotal, 0);
  const taxRate = 0.09975; // 9.975% selon le document fourni
  const totalTax = totalContractBeforeTax * taxRate;
  const totalContractWithTax = totalContractBeforeTax + totalTax;
  const totalPercentage = dcrs.reduce((sum, dcr) => sum + dcr.pourcentage, 0);
  
  // Calculs des éléments facturés
  const facturedDCRs = dcrs.filter(d => d.facture);
  const totalFacturedBeforeTax = facturedDCRs.reduce((sum, dcr) => sum + dcr.prixFermeTotal, 0);
  const totalFacturedWithTax = totalFacturedBeforeTax * (1 + taxRate);

  const updateDCR = (id: number, field: keyof DCRDetail, value: string | number | boolean) => {
    setDCRs(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const updateBillingBeforeTax = (id: number, project: keyof Omit<ProjectBilling, 'id'>, value: number) => {
    setBillingBeforeTax(prev => prev.map(item => 
      item.id === id ? { ...item, [project]: value } : item
    ))
  }

  const updateBillingWithTax = (id: number, project: keyof Omit<ProjectBilling, 'id'>, value: number) => {
    setBillingWithTax(prev => prev.map(item => 
      item.id === id ? { ...item, [project]: value } : item
    ))
  }

  const addRow = () => {
    const newId = Math.max(...dcrs.map(d => d.id)) + 1
    const newDCR: DCRDetail = {
      id: newId,
      numeroEtape: `DCR-${String(newId).padStart(3, '0')}`,
      description: '',
      pourcentage: 0,
      prixUnitaireFerme: 0,
      prixFermeTotal: 0,
      facture: false,
    }
    const newBilling: ProjectBilling = {
      id: newId,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0,
    }
    
    setDCRs(prev => [...prev, newDCR])
    setBillingBeforeTax(prev => [...prev, newBilling])
    setBillingWithTax(prev => [...prev, newBilling])
  }

  const deleteRow = (id: number) => {
    setDCRs(prev => prev.filter(item => item.id !== id))
    setBillingBeforeTax(prev => prev.filter(item => item.id !== id))
    setBillingWithTax(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div className="w-full space-y-8">
      {/* Légende pour le système de couleurs */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Légende</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-100 border border-purple-200 rounded"></div>
            <span className="text-gray-700">DCR facturé (marqué en mauve)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
            <span className="text-gray-700">DCR non facturé</span>
          </div>
        </div>
      </div>

      {/* Tableau des détails des DCRs avec résumé à droite */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Tableau principal - 3/4 de la largeur */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-orange-600 text-white p-4">
              <h3 className="text-lg font-semibold">1. Tableaux de DCR Detail</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                      N° Étape
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                      %
                    </th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      Prix unitaire ($)
                    </th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      Prix total ($)
                    </th>
                    <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                      Facturé
                    </th>
                    <th className="px-1 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                      
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dcrs.map((dcr) => (
                    <tr key={dcr.id} className={`hover:bg-gray-50 ${dcr.facture ? 'bg-purple-100 hover:bg-purple-200' : ''}`}>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <input
                          type="text"
                          value={dcr.numeroEtape}
                          onChange={(e) => updateDCR(dcr.id, 'numeroEtape', e.target.value)}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                          aria-label={`Numéro d'étape ${dcr.numeroEtape}`}
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={dcr.description}
                          onChange={(e) => updateDCR(dcr.id, 'description', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Description du DCR"
                          aria-label="Description du DCR"
                        />
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <input
                          type="number"
                          value={dcr.pourcentage}
                          onChange={(e) => updateDCR(dcr.id, 'pourcentage', parseFloat(e.target.value) || 0)}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                          min="0"
                          max="100"
                          step="0.01"
                          aria-label="Pourcentage"
                        />
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <input
                          type="number"
                          value={dcr.prixUnitaireFerme}
                          onChange={(e) => updateDCR(dcr.id, 'prixUnitaireFerme', parseFloat(e.target.value) || 0)}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                          min="0"
                          step="0.01"
                          aria-label="Prix unitaire ferme"
                        />
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <input
                          type="number"
                          value={dcr.prixFermeTotal}
                          onChange={(e) => updateDCR(dcr.id, 'prixFermeTotal', parseFloat(e.target.value) || 0)}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                          min="0"
                          step="0.01"
                          aria-label="Prix ferme total"
                        />
                      </td>
                      <td className="px-2 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={dcr.facture}
                          onChange={(e) => updateDCR(dcr.id, 'facture', e.target.checked)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                          aria-label="Marquer comme facturé"
                        />
                      </td>
                      <td className="px-1 py-2 text-center">
                        <button
                          onClick={() => deleteRow(dcr.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Supprimer cette ligne"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-gray-50">
              <button
                onClick={addRow}
                className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
              >
                Ajouter une ligne
              </button>
            </div>
          </div>
        </div>

        {/* Résumé DCR - 1/4 de la largeur */}
        <div className="xl:col-span-1">
          <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-lg shadow-lg p-6 text-white sticky top-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              📊 Résumé DCR
            </h3>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm mb-1">Total Contrat (Avant Taxes)</p>
                <p className="text-xl font-bold">{formatCurrency(totalContractBeforeTax)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm mb-1">Taxes (9.975%)</p>
                <p className="text-xl font-bold">{formatCurrency(totalTax)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm mb-1">Total Avec Taxes</p>
                <p className="text-2xl font-bold">{formatCurrency(totalContractWithTax)}</p>
              </div>
              <div className="border-t border-white/20 pt-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                  <p className="text-sm mb-1">Statut Facturation</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-white/70">Facturé</p>
                      <p className="font-bold">{formatCurrency(totalFacturedBeforeTax)}</p>
                    </div>
                    <div>
                      <p className="text-white/70">Non facturé</p>
                      <p className="font-bold">{formatCurrency(totalContractBeforeTax - totalFacturedBeforeTax)}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-white/70">DCRs</p>
                    <p className="font-bold">{dcrs.length}</p>
                  </div>
                  <div>
                    <p className="text-white/70">% Total</p>
                    <p className="font-bold">{totalPercentage.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau 2: Facturation par projet avant taxes avec résumé à droite */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Tableau facturation - 3/4 de la largeur */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 text-white p-4">
              <h3 className="text-lg font-semibold">2. Tableau de facturation par projet avant taxes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                      N° Étape
                    </th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      C228 NLT1
                    </th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      C229 NLT2
                    </th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      C230 NLT3
                    </th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      C231 NLT4
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dcrs.map((dcr) => {
                    const montantParProjet = dcr.prixFermeTotal / 4;
                    return (
                      <tr key={dcr.id} className={`hover:bg-gray-50 ${dcr.facture ? 'bg-purple-100 hover:bg-purple-200' : ''}`}>
                        <td className="px-2 py-2 whitespace-nowrap font-medium text-sm">
                          {dcr.numeroEtape}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(montantParProjet)}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(montantParProjet)}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(montantParProjet)}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(montantParProjet)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Résumé Facturation DCR - 1/4 de la largeur */}
        <div className="xl:col-span-1">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg p-6 text-white sticky top-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              💰 Résumé par Projet
            </h3>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm mb-1">C228 NLT1 (Avant Taxes)</p>
                <p className="text-xl font-bold">{formatCurrency(dcrs.reduce((sum, d) => sum + (d.prixFermeTotal / 4), 0))}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm mb-1">C229 NLT2 (Avant Taxes)</p>
                <p className="text-xl font-bold">{formatCurrency(dcrs.reduce((sum, d) => sum + (d.prixFermeTotal / 4), 0))}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm mb-1">C230 NLT3 (Avant Taxes)</p>
                <p className="text-xl font-bold">{formatCurrency(dcrs.reduce((sum, d) => sum + (d.prixFermeTotal / 4), 0))}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm mb-1">C231 NLT4 (Avant Taxes)</p>
                <p className="text-xl font-bold">{formatCurrency(dcrs.reduce((sum, d) => sum + (d.prixFermeTotal / 4), 0))}</p>
              </div>
              <div className="border-t border-white/20 pt-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                  <p className="text-sm mb-1">Facturation par Projet</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-white/70">Facturé</p>
                      <p className="font-bold">{formatCurrency(totalFacturedBeforeTax / 4)}</p>
                    </div>
                    <div>
                      <p className="text-white/70">Non facturé</p>
                      <p className="font-bold">{formatCurrency((totalContractBeforeTax - totalFacturedBeforeTax) / 4)}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm mb-1">Total Projets (Avant Taxes)</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalContractBeforeTax)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau 3: Facturation avec taxes avec résumé à droite */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Tableau facturation avec taxes - 3/4 de la largeur */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-600 text-white p-4">
              <h3 className="text-lg font-semibold">3. Tableau de facturation avec taxes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                      N° Étape
                    </th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      C228 NLT1
                    </th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      C229 NLT2
                    </th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      C230 NLT3
                    </th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      C231 NLT4
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dcrs.map((dcr) => {
                    const montantParProjetAvecTaxes = (dcr.prixFermeTotal * (1 + taxRate)) / 4;
                    return (
                      <tr key={dcr.id} className={`hover:bg-gray-50 ${dcr.facture ? 'bg-purple-100 hover:bg-purple-200' : ''}`}>
                        <td className="px-2 py-2 whitespace-nowrap font-medium text-sm">
                          {dcr.numeroEtape}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(montantParProjetAvecTaxes)}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(montantParProjetAvecTaxes)}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(montantParProjetAvecTaxes)}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(montantParProjetAvecTaxes)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Résumé Facturation DCR Avec Taxes - 1/4 de la largeur */}
        <div className="xl:col-span-1">
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg shadow-lg p-6 text-white sticky top-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              💰 Résumé avec Taxes
            </h3>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm mb-1">C228 NLT1 (Avec Taxes)</p>
                <p className="text-xl font-bold">{formatCurrency(dcrs.reduce((sum, d) => sum + ((d.prixFermeTotal * (1 + taxRate)) / 4), 0))}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm mb-1">C229 NLT2 (Avec Taxes)</p>
                <p className="text-xl font-bold">{formatCurrency(dcrs.reduce((sum, d) => sum + ((d.prixFermeTotal * (1 + taxRate)) / 4), 0))}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm mb-1">C230 NLT3 (Avec Taxes)</p>
                <p className="text-xl font-bold">{formatCurrency(dcrs.reduce((sum, d) => sum + ((d.prixFermeTotal * (1 + taxRate)) / 4), 0))}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm mb-1">C231 NLT4 (Avec Taxes)</p>
                <p className="text-xl font-bold">{formatCurrency(dcrs.reduce((sum, d) => sum + ((d.prixFermeTotal * (1 + taxRate)) / 4), 0))}</p>
              </div>
              <div className="border-t border-white/20 pt-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                  <p className="text-sm mb-1">Facturation avec Taxes par Projet</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-white/70">Facturé</p>
                      <p className="font-bold">{formatCurrency(totalFacturedWithTax / 4)}</p>
                    </div>
                    <div>
                      <p className="text-white/70">Non facturé</p>
                      <p className="font-bold">{formatCurrency((totalContractWithTax - totalFacturedWithTax) / 4)}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm mb-1">Total Projets (Avec Taxes)</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalContractWithTax)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}