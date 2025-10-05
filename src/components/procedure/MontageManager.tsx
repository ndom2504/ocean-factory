'use client'

import { useState } from 'react'
import { DocumentTextIcon, DocumentArrowUpIcon, CheckCircleIcon, ExclamationTriangleIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import PaymentClaimForm from './PaymentClaimForm'

interface DocumentStatus {
  id: string
  nom: string
  type: 'formulaire' | 'import'
  statut: 'vide' | 'en_cours' | 'complete'
  fichier?: File | null
  contenu?: any
}

export default function MontageManager() {
  const [documents, setDocuments] = useState<DocumentStatus[]>([
    {
      id: 'payment-claim',
      nom: 'Payment Claim',
      type: 'formulaire',
      statut: 'vide'
    },
    {
      id: 'formulaire-1111',
      nom: 'Formulaire 1111',
      type: 'formulaire',
      statut: 'vide'
    },
    {
      id: 'facture-sap',
      nom: 'Facture SAP',
      type: 'import',
      statut: 'vide'
    },
    {
      id: 'courriel-client',
      nom: 'Courriel de confirmation du client',
      type: 'import',
      statut: 'vide'
    },
    {
      id: 'documents-annexes',
      nom: 'Documents annexes',
      type: 'import',
      statut: 'vide'
    }
  ])

  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
  const [showPaymentClaimForm, setShowPaymentClaimForm] = useState(false)

  const handleFileImport = (documentId: string, file: File) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { ...doc, fichier: file, statut: 'complete' as const }
        : doc
    ))
  }

  const handleFormulaireFill = (documentId: string) => {
    if (documentId === 'payment-claim') {
      setShowPaymentClaimForm(true)
    } else {
      setSelectedDocument(documentId)
    }
  }

  const handlePaymentClaimSave = (data: any) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === 'payment-claim' 
        ? { ...doc, contenu: data, statut: 'complete' as const }
        : doc
    ))
    setShowPaymentClaimForm(false)
  }

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'complete':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case 'en_cours':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
      default:
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
    }
  }

  const getStatusText = (statut: string) => {
    switch (statut) {
      case 'complete':
        return 'Complété'
      case 'en_cours':
        return 'En cours'
      default:
        return 'À faire'
    }
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'complete':
        return 'bg-green-50 border-green-200'
      case 'en_cours':
        return 'bg-yellow-50 border-yellow-200'
      default:
        return 'bg-red-50 border-red-200'
    }
  }

  const getCompletionPercentage = () => {
    const completed = documents.filter(doc => doc.statut === 'complete').length
    return Math.round((completed / documents.length) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Barre de progression */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Progression du Montage
          </h3>
          <span className="text-2xl font-bold text-purple-600">
            {getCompletionPercentage()}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`bg-purple-600 h-3 rounded-full transition-all duration-300`}
            style={{ width: `${getCompletionPercentage()}%` }}
          />
        </div>
        
        <div className="mt-3 text-sm text-gray-600">
          {documents.filter(doc => doc.statut === 'complete').length} sur {documents.length} documents complétés
        </div>
      </div>

      {/* Liste des documents */}
      <div className="grid gap-4">
        {documents.map((document) => (
          <div
            key={document.id}
            className={`p-6 rounded-lg border-2 transition-all ${getStatusColor(document.statut)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  {document.type === 'formulaire' ? (
                    <DocumentTextIcon className="w-8 h-8 text-purple-600" />
                  ) : (
                    <DocumentArrowUpIcon className="w-8 h-8 text-blue-600" />
                  )}
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {document.nom}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(document.statut)}
                    <span className="text-sm font-medium">
                      {getStatusText(document.statut)}
                    </span>
                  </div>
                  {document.fichier && (
                    <p className="text-sm text-gray-600 mt-1">
                      Fichier: {document.fichier.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex space-x-3">
                {document.type === 'formulaire' ? (
                  <button
                    onClick={() => handleFormulaireFill(document.id)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    {document.statut === 'complete' ? 'Modifier' : 'Remplir'}
                  </button>
                ) : (
                  <div className="relative">
                    <label htmlFor={`file-${document.id}`} className="block">
                      <input
                        id={`file-${document.id}`}
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleFileImport(document.id, file)
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                        aria-label={`Importer un fichier pour ${document.nom}`}
                      />
                      <div className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer">
                        <ArrowUpTrayIcon className="h-4 w-4" />
                        <span>Importer</span>
                      </div>
                    </label>
                  </div>
                )}
                
                {document.statut === 'complete' && (
                  <button
                    onClick={() => {
                      if (document.fichier) {
                        // Ouvrir l'aperçu du document
                        const url = URL.createObjectURL(document.fichier)
                        window.open(url, '_blank')
                      }
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Aperçu
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions globales */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Actions
        </h3>
        
        <div className="flex space-x-4">
          <button
            disabled={getCompletionPercentage() < 100}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              getCompletionPercentage() === 100
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Valider le Montage
          </button>
          
          <button className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            Sauvegarder le Brouillon
          </button>
          
          <button className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Modal pour les formulaires (placeholder) */}
      {selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {documents.find(d => d.id === selectedDocument)?.nom}
                </h3>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-center py-12">
                <p className="text-gray-600">
                  Formulaire en cours de développement...
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Les données et documents seront transmis prochainement
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formulaire Payment Claim */}
      <PaymentClaimForm
        isOpen={showPaymentClaimForm}
        onClose={() => setShowPaymentClaimForm(false)}
        onSave={handlePaymentClaimSave}
      />
    </div>
  )
}