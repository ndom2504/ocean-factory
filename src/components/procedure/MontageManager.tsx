'use client'

import React, { useState } from 'react'
import { DocumentTextIcon, DocumentArrowUpIcon, CheckCircleIcon, ExclamationTriangleIcon, ArrowUpTrayIcon, LockClosedIcon, EyeIcon } from '@heroicons/react/24/outline'
import PaymentClaimForm from './PaymentClaimForm'
import PWGSC1111Form from './PWGSC1111Form'
import { useDocuments } from '../../contexts/DocumentsContext'

export default function MontageManagerNew() {
  const { documents, updateDocument, isDocumentAccessible, getDocumentById, resetAllDocuments } = useDocuments()
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
  const [showPaymentClaimForm, setShowPaymentClaimForm] = useState(false)
  const [showPWGSC1111Form, setShowPWGSC1111Form] = useState(false)
  const [previewDocument, setPreviewDocument] = useState<string | null>(null)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [saveData, setSaveData] = useState({ name: '', status: 'en_cours' })
  const [savedMontages, setSavedMontages] = useState<any[]>([])
  const [showSavedMontages, setShowSavedMontages] = useState(false)

  // Charger les montages sauvegardés au démarrage
  React.useEffect(() => {
    const loadSavedMontages = () => {
      const saved = JSON.parse(localStorage.getItem('oceanfactory_montages') || '[]')
      setSavedMontages(saved)
    }
    loadSavedMontages()
  }, [])

  const loadMontage = (montage: any) => {
    if (confirm(`Êtes-vous sûr de vouloir charger le montage "${montage.name}" ? Les données actuelles seront perdues.`)) {
      // Restaurer l'état des documents
      montage.documents.forEach((doc: any) => {
        updateDocument(doc.id, doc)
      })
      setShowSavedMontages(false)
      alert(`Montage "${montage.name}" chargé avec succès !`)
    }
  }

  const deleteMontage = (index: number, montageName: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le montage "${montageName}" ?`)) {
      const updated = savedMontages.filter((_, i) => i !== index)
      setSavedMontages(updated)
      localStorage.setItem('oceanfactory_montages', JSON.stringify(updated))
      alert(`Montage "${montageName}" supprimé !`)
    }
  }

  const handleFileImport = (documentId: string, file: File) => {
    updateDocument(documentId, { 
      fichier: file, 
      statut: 'complete',
      previewData: URL.createObjectURL(file)
    })
  }

  const handleFormulaireFill = (documentId: string) => {
    const document = getDocumentById(documentId)
    if (!document || !isDocumentAccessible(document.ordre)) {
      alert('Ce document ne peut pas être rempli pour le moment. Veuillez compléter les documents précédents d\'abord.')
      return
    }

    if (documentId === 'payment-claim') {
      setShowPaymentClaimForm(true)
    } else if (documentId === 'formulaire-1111') {
      setShowPWGSC1111Form(true)
    } else {
      setSelectedDocument(documentId)
    }
  }

  const handlePaymentClaimSave = (data: any) => {
    updateDocument('payment-claim', { 
      contenu: data, 
      statut: 'complete',
      previewData: 'Payment Claim Form complété'
    })
    setShowPaymentClaimForm(false)
  }

  const handlePWGSC1111Save = (data: any) => {
    updateDocument('formulaire-1111', { 
      contenu: data, 
      statut: 'complete',
      previewData: 'Formulaire PWGSC-1111 complété'
    })
    setShowPWGSC1111Form(false)
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

  const getStatusText = (statut: string): string => {
    switch (statut) {
      case 'complete':
        return 'Complété'
      case 'en_cours':
        return 'En cours'
      default:
        return 'À faire'
    }
  }

  const getStatusColor = (statut: string): string => {
    switch (statut) {
      case 'complete':
        return 'bg-green-50 border-green-200'
      case 'en_cours':
        return 'bg-yellow-50 border-yellow-200'
      default:
        return 'bg-red-50 border-red-200'
    }
  }

  const getCompletionPercentage = (): number => {
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
            className="bg-purple-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionPercentage()}%` }}
          />
        </div>
        
        <div className="mt-3 text-sm text-gray-600">
          {documents.filter(doc => doc.statut === 'complete').length} sur {documents.length} documents complétés
        </div>
      </div>

      {/* Liste des documents */}
      <div className="grid gap-4">
        {documents.map((document) => {
          const isAccessible = isDocumentAccessible(document.ordre)
          
          return (
            <div
              key={document.id}
              className={`p-6 rounded-lg border-2 transition-all ${
                isAccessible ? getStatusColor(document.statut) : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    {!isAccessible ? (
                      <LockClosedIcon className="w-8 h-8 text-gray-400" />
                    ) : document.type === 'formulaire' ? (
                      <DocumentTextIcon className="w-8 h-8 text-purple-600" />
                    ) : (
                      <DocumentArrowUpIcon className="w-8 h-8 text-blue-600" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded">
                        {document.ordre}
                      </span>
                      <h4 className={`text-lg font-semibold ${isAccessible ? 'text-gray-900' : 'text-gray-500'}`}>
                        {document.nom}
                      </h4>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusIcon(document.statut)}
                      <span className="text-sm font-medium">
                        {!isAccessible ? 'Bloqué - Terminez les documents précédents' : getStatusText(document.statut)}
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
                  {/* Bouton Aperçu */}
                  {document.statut === 'complete' && document.previewData && (
                    <button
                      onClick={() => setPreviewDocument(document.id)}
                      className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors flex items-center space-x-2"
                    >
                      <EyeIcon className="w-4 h-4" />
                      <span>Aperçu</span>
                    </button>
                  )}

                  {isAccessible && (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Actions globales */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Actions
        </h3>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => {
              if (confirm('Êtes-vous sûr de vouloir créer un nouveau montage ? Toutes les données actuelles seront perdues.')) {
                resetAllDocuments()
                setSelectedDocument(null)
                setPreviewDocument(null)
                alert('Nouveau montage créé avec succès !')
              }
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Nouveau montage
          </button>

          <button
            onClick={() => {
              const completionPercentage = getCompletionPercentage()
              setSaveData({
                name: `Montage_${new Date().toLocaleDateString('fr-CA')}`,
                status: completionPercentage === 100 ? 'acheve' : 'en_cours'
              })
              setShowSaveModal(true)
            }}
            className="px-6 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
          >
            Sauvegarder
          </button>

          <button
            onClick={() => setShowSavedMontages(true)}
            className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Charger un montage ({savedMontages.length})
          </button>
          
          <button
            disabled={getCompletionPercentage() < 100}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              getCompletionPercentage() === 100
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Valider le Montage Complet
          </button>
          
          <button
            className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            onClick={() => {
              const completed = documents.filter(doc => doc.statut === 'complete')
              console.log('Documents complétés:', completed)
            }}
          >
            Exporter la Liste
          </button>
        </div>
      </div>

      {/* Formulaire Payment Claim */}
      <PaymentClaimForm
        isOpen={showPaymentClaimForm}
        onClose={() => setShowPaymentClaimForm(false)}
        onSave={handlePaymentClaimSave}
      />

      {/* Formulaire PWGSC-1111 */}
      <PWGSC1111Form
        isOpen={showPWGSC1111Form}
        onClose={() => setShowPWGSC1111Form(false)}
        onSave={handlePWGSC1111Save}
      />

      {/* Modal d'aperçu */}
      {previewDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Aperçu - {getDocumentById(previewDocument)?.nom}
                </h3>
                <button
                  onClick={() => setPreviewDocument(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {(() => {
                const document = getDocumentById(previewDocument)
                if (!document) return null

                if (document.type === 'formulaire') {
                  return (
                    <div className="text-center py-8">
                      <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        Formulaire Complété
                      </h4>
                      <p className="text-gray-600 mb-4">
                        {document.previewData}
                      </p>
                      <p className="text-sm text-gray-500">
                        Ce formulaire a été rempli et validé avec succès.
                      </p>
                    </div>
                  )
                } else if (document.fichier) {
                  const fileUrl = document.previewData
                  const fileType = document.fichier.type

                  if (fileType.startsWith('image/')) {
                    return (
                      <div className="text-center">
                        <img 
                          src={fileUrl} 
                          alt={document.nom}
                          className="max-w-full max-h-96 mx-auto rounded-lg shadow-lg"
                        />
                        <p className="mt-4 text-sm text-gray-600">
                          Fichier: {document.fichier.name}
                        </p>
                      </div>
                    )
                  } else {
                    return (
                      <div className="text-center py-8">
                        <DocumentTextIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">
                          Document Importé
                        </h4>
                        <p className="text-gray-600 mb-4">
                          Nom du fichier: {document.fichier.name}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          Type: {document.fichier.type || 'Type de fichier non déterminé'}
                        </p>
                        <a
                          href={fileUrl}
                          download={document.fichier.name}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
                          Télécharger le fichier
                        </a>
                      </div>
                    )
                  }
                }

                return (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Aucun aperçu disponible</p>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Modal de sauvegarde */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-t-lg shadow-xl w-full max-w-2xl mx-4 animate-slide-up">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Sauvegarder le montage
                </h3>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="saveName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du montage
                  </label>
                  <input
                    id="saveName"
                    type="text"
                    value={saveData.name}
                    onChange={(e) => setSaveData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Nom du montage..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut du montage
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="en_cours"
                        checked={saveData.status === 'en_cours'}
                        onChange={(e) => setSaveData(prev => ({ ...prev, status: e.target.value }))}
                        className="mr-2"
                      />
                      <span className="text-yellow-600 font-medium">En cours</span>
                      <span className="text-sm text-gray-500 ml-2">
                        - Montage non terminé, peut être poursuivi plus tard
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="acheve"
                        checked={saveData.status === 'acheve'}
                        onChange={(e) => setSaveData(prev => ({ ...prev, status: e.target.value }))}
                        className="mr-2"
                        disabled={getCompletionPercentage() < 100}
                      />
                      <span className={`font-medium ${getCompletionPercentage() === 100 ? 'text-green-600' : 'text-gray-400'}`}>
                        Achevé
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        - Montage complété (disponible uniquement si tous les documents sont complétés)
                      </span>
                    </label>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Aperçu de la sauvegarde</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Progression:</strong> {getCompletionPercentage()}% ({documents.filter(doc => doc.statut === 'complete').length}/{documents.length} documents)</p>
                    <p><strong>Date:</strong> {new Date().toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                    <p><strong>Documents complétés:</strong></p>
                    <ul className="ml-4">
                      {documents.filter(doc => doc.statut === 'complete').map(doc => (
                        <li key={doc.id} className="text-green-600">• {doc.nom}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    // Ici on sauvegarderait normalement dans une base de données
                    const saveObject = {
                      name: saveData.name,
                      status: saveData.status,
                      documents: documents,
                      savedAt: new Date().toISOString(),
                      completion: getCompletionPercentage()
                    }
                    
                    // Pour le moment, on sauvegarde dans localStorage
                    const savedMontagesList = JSON.parse(localStorage.getItem('oceanfactory_montages') || '[]')
                    savedMontagesList.push(saveObject)
                    localStorage.setItem('oceanfactory_montages', JSON.stringify(savedMontagesList))
                    
                    // Mettre à jour la liste locale
                    setSavedMontages(savedMontagesList)
                    
                    setShowSaveModal(false)
                    alert(`Montage "${saveData.name}" sauvegardé avec succès !`)
                  }}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal des montages sauvegardés */}
      {showSavedMontages && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Montages sauvegardés ({savedMontages.length})
                </h3>
                <button
                  onClick={() => setShowSavedMontages(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {savedMontages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DocumentTextIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg mb-2">Aucun montage sauvegardé</p>
                  <p className="text-gray-400 text-sm">Créez et sauvegardez un montage pour le voir apparaître ici.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedMontages.map((montage, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="text-lg font-semibold text-gray-900">{montage.name}</h4>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              montage.status === 'acheve' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {montage.status === 'acheve' ? 'Achevé' : 'En cours'}
                            </span>
                          </div>
                          <div className="mt-2 text-sm text-gray-600 space-y-1">
                            <p><strong>Progression:</strong> {montage.completion}% ({montage.documents.filter((d: any) => d.statut === 'complete').length}/{montage.documents.length} documents)</p>
                            <p><strong>Sauvegardé le:</strong> {new Date(montage.savedAt).toLocaleDateString('fr-FR', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {montage.documents.filter((d: any) => d.statut === 'complete').map((doc: any) => (
                                <span key={doc.id} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                                  {doc.nom}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => loadMontage(montage)}
                            className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
                          >
                            Charger
                          </button>
                          <button
                            onClick={() => deleteMontage(index, montage.name)}
                            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}