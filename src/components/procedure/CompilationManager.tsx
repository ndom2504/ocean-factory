'use client'

import { useState, useRef } from 'react'
import { DocumentCheckIcon, FolderArrowDownIcon, CheckCircleIcon, XCircleIcon, EyeIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import PWGSC1111Form from './PWGSC1111Form'
import PaymentClaimForm from './PaymentClaimForm'
import { useDocuments } from '../../contexts/DocumentsContext'

export default function CompilationManager() {
  const { documents, isAllDocumentsComplete, getDocumentById } = useDocuments()
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewDocument, setPreviewDocument] = useState<string | null>(null)

  const pwgscFormRef = useRef<HTMLDivElement>(null)
  const paymentFormRef = useRef<HTMLDivElement>(null)

  const generatePDF = async () => {
    if (!isAllDocumentsComplete()) {
      alert('Tous les documents doivent être complétés avant de générer le PDF.')
      return
    }

    setIsGenerating(true)
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      
      // Configuration pour la qualité
      const scale = 2
      
      // 1. Ajouter le formulaire PWGSC-1111
      if (pwgscFormRef.current) {
        // Temporairement rendre visible pour la capture
        pwgscFormRef.current.style.display = 'block'
        
        const canvas1 = await html2canvas(pwgscFormRef.current, {
          scale: scale,
          useCORS: true,
          allowTaint: true
        })
        
        const imgData1 = canvas1.toDataURL('image/png')
        const imgWidth1 = pageWidth - 20
        const imgHeight1 = (canvas1.height * imgWidth1) / canvas1.width
        
        pdf.addImage(imgData1, 'PNG', 10, 10, imgWidth1, imgHeight1)
        
        // Cacher à nouveau
        pwgscFormRef.current.style.display = 'none'
      }
      
      // Nouvelle page pour Payment Claim
      pdf.addPage()
      
      // 2. Ajouter le Payment Claim Form
      if (paymentFormRef.current) {
        paymentFormRef.current.style.display = 'block'
        
        const canvas2 = await html2canvas(paymentFormRef.current, {
          scale: scale,
          useCORS: true,
          allowTaint: true
        })
        
        const imgData2 = canvas2.toDataURL('image/png')
        const imgWidth2 = pageWidth - 20
        const imgHeight2 = (canvas2.height * imgWidth2) / canvas2.width
        
        pdf.addImage(imgData2, 'PNG', 10, 10, imgWidth2, imgHeight2)
        
        paymentFormRef.current.style.display = 'none'
      }
      
      // 3-5. Ajouter des pages de placeholder pour les autres documents
      const incompleteDocs = documents.filter(doc => doc.statut !== 'complete' && doc.type !== 'formulaire')
      
      for (const doc of incompleteDocs) {
        pdf.addPage()
        pdf.setFontSize(20)
        pdf.text(`${doc.ordre}. ${doc.nom}`, 20, 30)
        pdf.setFontSize(12)
        pdf.text('Document à insérer lors de la finalisation', 20, 50)
        pdf.text('Ce document sera ajouté automatiquement', 20, 65)
        pdf.text('lorsque les données seront disponibles.', 20, 80)
      }
      
      // Télécharger le PDF
      const fileName = `Ocean_Factory_Compilation_${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)
      
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error)
      alert('Erreur lors de la génération du PDF')
    } finally {
      setIsGenerating(false)
    }
  }

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'complete':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case 'en_cours':
        return <div className="w-5 h-5 rounded-full bg-yellow-300"></div>
      default:
        return <XCircleIcon className="w-5 h-5 text-red-500" />
    }
  }

  const getStatusText = (statut: string) => {
    switch (statut) {
      case 'complete':
        return 'Disponible'
      case 'en_cours':
        return 'En cours'
      default:
        return 'Manquant'
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-lg border border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DocumentCheckIcon className="w-8 h-8 text-purple-600" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Compilation des Documents
            </h3>
            
            <p className="text-gray-600 mb-6">
              Compilation automatique de tous les documents du montage en un PDF final
            </p>
          </div>

          {/* Liste des documents */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="font-medium text-gray-900 mb-4">Documents à compiler :</h4>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-white rounded border">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-500">{doc.ordre}.</span>
                    {getStatusIcon(doc.statut)}
                    <span className="text-sm font-medium text-gray-900">{doc.nom}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs px-2 py-1 rounded ${
                      doc.statut === 'complete' ? 'bg-green-100 text-green-800' :
                      doc.statut === 'en_cours' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {getStatusText(doc.statut)}
                    </span>
                    
                    {doc.statut === 'complete' && doc.previewData && (
                      <button
                        onClick={() => setPreviewDocument(doc.id)}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors flex items-center space-x-1"
                      >
                        <EyeIcon className="w-3 h-3" />
                        <span>Aperçu</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bouton de compilation */}
          <div className="text-center">
            <button
              onClick={generatePDF}
              disabled={isGenerating || !isAllDocumentsComplete()}
              className={`flex items-center space-x-2 mx-auto px-6 py-3 rounded-md font-medium transition-colors ${
                isGenerating || !isAllDocumentsComplete()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              <FolderArrowDownIcon className="w-5 h-5" />
              <span>
                {isGenerating 
                  ? 'Génération en cours...' 
                  : !isAllDocumentsComplete()
                    ? 'En attente des documents manquants'
                    : 'Générer et Télécharger le PDF'
                }
              </span>
            </button>
            
            {!isAllDocumentsComplete() && (
              <p className="mt-2 text-sm text-orange-600">
                Tous les documents doivent être complétés dans Montage avant de pouvoir générer le PDF.
              </p>
            )}
          </div>
        </div>
      </div>

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
                        Formulaire Prêt pour Compilation
                      </h4>
                      <p className="text-gray-600 mb-4">
                        {document.previewData}
                      </p>
                      <p className="text-sm text-gray-500">
                        Ce formulaire sera inclus dans le PDF final.
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
                        <DocumentCheckIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">
                          Document Prêt pour Compilation
                        </h4>
                        <p className="text-gray-600 mb-4">
                          Nom du fichier: {document.fichier.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Ce document sera inclus dans le PDF final.
                        </p>
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

      {/* Formulaires cachés pour la capture PDF */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <div ref={pwgscFormRef} style={{ display: 'none', width: '210mm', backgroundColor: 'white' }}>
          <PWGSC1111Form 
            isOpen={true}
            onClose={() => {}}
            onSave={() => {}}
          />
        </div>
        
        <div ref={paymentFormRef} style={{ display: 'none', width: '210mm', backgroundColor: 'white' }}>
          <PaymentClaimForm 
            isOpen={true}
            onClose={() => {}}
            onSave={() => {}}
          />
        </div>
      </div>
    </div>
  )
}