'use client'

import { useState } from 'react'
import MontageManager from './MontageManager'
import CompilationManager from './CompilationManager'

export default function ProcedureManager() {
  const [activeSubTab, setActiveSubTab] = useState<'montage' | 'compilation'>('montage')

  // Fonction pour gérer la sauvegarde des réclamations
  const handleSavePaymentClaim = (data: any) => {
    console.log('Données de réclamation sauvegardées:', data)
    // Ici vous pouvez ajouter la logique pour sauvegarder les données
  }

  // Fonction pour gérer la sauvegarde du formulaire PWGSC-1111
  const handleSavePWGSC1111 = (data: any) => {
    console.log('Données PWGSC-1111 sauvegardées:', data)
    // Ici vous pouvez ajouter la logique pour sauvegarder les données
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Gestion des Procédures</h2>
        <p className="text-gray-600">
          Gérez le montage, la compilation des fichiers et les réclamations de paiement
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b">
          <nav className="flex space-x-8 px-6" aria-label="Sub-tabs">
            <button
              onClick={() => setActiveSubTab('montage')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSubTab === 'montage'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Montage
            </button>
            <button
              onClick={() => setActiveSubTab('compilation')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSubTab === 'compilation'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Compilation
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeSubTab === 'montage' && <MontageManager />}
          {activeSubTab === 'compilation' && <CompilationManager />}
        </div>
      </div>
    </div>
  )
}