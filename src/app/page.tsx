'use client'

import { useState, useEffect, useRef } from 'react'
import MilestonesDetails from '@/components/milestones/MilestonesDetails'
import DCRDetails from '@/components/dcr/DCRDetails'
import CalculDetails from '@/components/calcul/CalculDetails'
import DocumentManager from '@/components/documents/DocumentManager'
import ProcedureManager from '@/components/procedure/ProcedureManager'

export default function Home() {
  const [activeTab, setActiveTab] = useState('details')
  const [detailsSubTab, setDetailsSubTab] = useState('milestones')
  const [selectedDocumentFolder, setSelectedDocumentFolder] = useState<{type: string, id: string, name: string} | null>(null)
  const documentManagerRef = useRef<any>(null)

  // Écouter l'événement pour ouvrir un dossier de documents
  useEffect(() => {
    const handleOpenDocumentFolder = (event: any) => {
      const { type, id, name } = event.detail
      setSelectedDocumentFolder({ type, id, name })
      setActiveTab('documents')
    }

    window.addEventListener('openDocumentFolder', handleOpenDocumentFolder)
    return () => window.removeEventListener('openDocumentFolder', handleOpenDocumentFolder)
  }, [])

  return (
    <div className="min-h-screen w-full p-4">
      {/* Header */}
      <div className="bg-ocean-blue text-white p-6 rounded-lg mb-6 shadow-lg">
        <h1 className="text-3xl font-bold">Ocean Factory</h1>
        <p className="text-blue-100 mt-2">Système de Gestion de Facturation</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'details'
                  ? 'border-ocean-blue text-ocean-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Détails Amendment
            </button>
            <button
              onClick={() => setActiveTab('calcul')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'calcul'
                  ? 'border-ocean-blue text-ocean-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Registres
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'documents'
                  ? 'border-ocean-blue text-ocean-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Archives
            </button>
            <button
              onClick={() => setActiveTab('procedure')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'procedure'
                  ? 'border-ocean-blue text-ocean-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Procédure
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'details' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Détails Amendment</h2>
              
              {/* Sub-navigation for Details */}
              <div className="flex space-x-4 mb-6">
                <button 
                  onClick={() => setDetailsSubTab('milestones')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    detailsSubTab === 'milestones'
                      ? 'bg-ocean-light text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Milestones Details
                </button>
                <button 
                  onClick={() => setDetailsSubTab('dcr')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    detailsSubTab === 'dcr'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  DCR Details
                </button>
              </div>

              {/* Content based on sub-tab */}
              {detailsSubTab === 'milestones' && <MilestonesDetails />}
              {detailsSubTab === 'dcr' && <DCRDetails />}
            </div>
          )}

          {activeTab === 'calcul' && (
            <div>
              <CalculDetails />
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <DocumentManager 
                ref={documentManagerRef}
                selectedFolder={selectedDocumentFolder}
                onFolderChange={setSelectedDocumentFolder}
              />
            </div>
          )}

          {activeTab === 'procedure' && (
            <div>
              <ProcedureManager />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm">
        <p>© 2024 Ocean Factory - Système de Facturation v0.1.0</p>
      </div>
    </div>
  )
}