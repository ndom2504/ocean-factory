'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { HomeIcon } from '@heroicons/react/24/outline'
import MilestonesDetails from '@/components/milestones/MilestonesDetails'
import DCRDetails from '@/components/dcr/DCRDetails'
import CalculDetails from '@/components/calcul/CalculDetails'
import DocumentManager from '@/components/documents/DocumentManager'
import ProcedureManager from '@/components/procedure/ProcedureManager'

export default function Dashboard() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('details')
  const [detailsSubTab, setDetailsSubTab] = useState('milestones')
  const [selectedDocumentFolder, setSelectedDocumentFolder] = useState<{type: string, id: string, name: string} | null>(null)
  const [highlightedItem, setHighlightedItem] = useState<string | null>(null)
  const documentManagerRef = useRef<any>(null)

  // Gérer les paramètres URL pour la navigation depuis la recherche
  useEffect(() => {
    const tab = searchParams.get('tab')
    const subTab = searchParams.get('subTab')
    const highlight = searchParams.get('highlight')

    if (tab) {
      setActiveTab(tab)
    }
    if (subTab) {
      setDetailsSubTab(subTab)
    }
    if (highlight) {
      setHighlightedItem(highlight)
      // Supprimer le highlight après 3 secondes
      setTimeout(() => setHighlightedItem(null), 3000)
    }
  }, [searchParams])

  // Écouter l'événement pour ouvrir un dossier de documents
  useEffect(() => {
    const handleOpenDocumentFolder = (event: any) => {
      const { type, id, name } = event.detail
      setSelectedDocumentFolder({ type, id, name })
      setActiveTab('documents')
    }

    window.addEventListener('openDocumentFolder', handleOpenDocumentFolder)
    return () => window.removeEventListener('openDocumentFolder', handleOpenDocumentFolder)
  // Fonction pour sauvegarder la base de données
  const saveDatabase = () => {
    try {
      // Récupérer toutes les données du localStorage
      const allData = {
        milestones: localStorage.getItem('milestones') || '[]',
        dcr: localStorage.getItem('dcr') || '[]',
        billingBeforeTax: localStorage.getItem('billingBeforeTax') || '[]',
        billingWithTax: localStorage.getItem('billingWithTax') || '[]',
        documents: localStorage.getItem('documents') || '[]',
        procedures: localStorage.getItem('procedures') || '[]',
        formData: localStorage.getItem('formData') || '{}',
        timestamp: new Date().toISOString(),
        version: '1.0'
      }

      // Créer un fichier JSON à télécharger
      const dataStr = JSON.stringify(allData, null, 2)
      const dataBlob = new Blob([dataStr], {type: 'application/json'})
      
      // Créer un lien de téléchargement
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `ocean-factory-backup-${new Date().toISOString().split('T')[0]}.json`
      
      // Déclencher le téléchargement
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Nettoyer l'URL
      URL.revokeObjectURL(url)
      
      alert('✅ Base de données sauvegardée avec succès!')
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      alert('❌ Erreur lors de la sauvegarde de la base de données')
    }
  }

  // Fonction pour restaurer la base de données
  const restoreDatabase = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (event: any) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e: any) => {
          try {
            const data = JSON.parse(e.target.result)
            
            // Vérifier que c'est un fichier de sauvegarde valide
            if (data.version && data.timestamp) {
              // Restaurer toutes les données
              Object.keys(data).forEach(key => {
                if (key !== 'timestamp' && key !== 'version') {
                  const value = typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key])
                  localStorage.setItem(key, value)
                }
              })
              
              alert(`✅ Base de données restaurée avec succès!\nSauvegarde du: ${new Date(data.timestamp).toLocaleString('fr-FR')}`)
              window.location.reload() // Recharger la page pour appliquer les changements
            } else {
              alert('❌ Fichier de sauvegarde invalide')
            }
          } catch (error) {
            console.error('Erreur lors de la restauration:', error)
            alert('❌ Erreur lors de la restauration de la base de données')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  return (
    <div className="min-h-screen w-full p-4">
      {/* Header */}
      <div className="bg-ocean-blue text-white p-6 rounded-lg mb-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Ocean Factory</h1>
            <p className="text-blue-100 mt-2">Système de Gestion de Facturation</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={saveDatabase}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>SAUVEGARDER</span>
            </button>
            <button
              onClick={restoreDatabase}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>RESTAURER</span>
            </button>
            <button
              onClick={() => router.push('/welcome')}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <HomeIcon className="w-5 h-5" />
              <span>Accueil</span>
            </button>
          </div>
        </div>
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
              {detailsSubTab === 'milestones' && (
                <MilestonesDetails />
              )}
              {detailsSubTab === 'dcr' && (
                <DCRDetails />
              )}
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
        <p>© 2024 Ocean Factory - Système de Facturation v1.0.0</p>
      </div>
    </div>
  )
}
}