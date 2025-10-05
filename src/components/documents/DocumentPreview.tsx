'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { type Document } from '@/contexts/AppContext'
import Image from 'next/image'

interface DocumentPreviewProps {
  document: Document | null
  isOpen: boolean
  onClose: () => void
}

export default function DocumentPreview({ document, isOpen, onClose }: DocumentPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (document && document.url) {
      setPreviewUrl(document.url)
    } else {
      setPreviewUrl(null)
    }
  }, [document])

  if (!isOpen || !document) return null

  const isPdf = document.type === 'application/pdf'
  const isImage = document.type.startsWith('image/')
  const isText = document.type.startsWith('text/') || document.type === 'application/json'
  const isOffice = document.type.includes('officedocument') || 
                   document.type.includes('msword') || 
                   document.type.includes('excel') ||
                   document.type.includes('powerpoint')

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDownload = () => {
    if (previewUrl) {
      const link = window.document.createElement('a')
      link.href = previewUrl
      link.download = document.nom
      link.click()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg shadow-xl w-[95vw] h-[95vh] max-w-7xl flex flex-col overflow-hidden">
        {/* En-tête */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {document.nom}
            </h3>
            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
              <span>{formatFileSize(document.taille)}</span>
              <span>•</span>
              <span>{document.dateUpload.toLocaleDateString('fr-CA')}</span>
              <span>•</span>
              <span className="capitalize">{document.type}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              title="Télécharger le document"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              <span className="text-sm">Télécharger</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              title="Fermer l'aperçu"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Zone de prévisualisation */}
        <div className="flex-1 overflow-hidden bg-gray-100">
          {isPdf && previewUrl && (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 flex flex-col">
                <div className="bg-gray-200 px-4 py-2 text-sm text-gray-600 border-b">
                  💡 Conseil : Utilisez Ctrl+molette pour zoomer, ou les contrôles du PDF
                </div>
                <div className="flex-1 relative">
                  <iframe
                    src={`${previewUrl}#view=FitH&toolbar=1&navpanes=0&scrollbar=1&zoom=page-width`}
                    className="absolute inset-0 w-full h-full border-0 bg-white"
                    title={`Aperçu de ${document.nom}`}
                  />
                </div>
              </div>
            </div>
          )}

          {isImage && previewUrl && (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt={document.nom}
                className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
              />
            </div>
          )}

          {isText && previewUrl && (
            <iframe
              src={previewUrl}
              className="w-full h-full border-0 bg-white"
              title={`Aperçu de ${document.nom}`}
            />
          )}

          {isOffice && (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Document Office
                </h4>
                <p className="text-gray-600 mb-4">
                  L&apos;aperçu de ce type de document n&apos;est pas disponible dans le navigateur.
                </p>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  <span>Télécharger pour ouvrir</span>
                </button>
              </div>
            </div>
          )}

          {!isPdf && !isImage && !isText && !isOffice && (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Aperçu non disponible
                </h4>
                <p className="text-gray-600 mb-4">
                  Ce type de fichier ne peut pas être prévisualisé dans le navigateur.
                </p>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  <span>Télécharger le fichier</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Instructions pour fermer */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Appuyez sur Échap ou cliquez sur le bouton X pour fermer l&apos;aperçu
          </p>
        </div>
      </div>
    </div>
  )
}