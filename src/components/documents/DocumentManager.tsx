'use client'

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { FolderIcon, DocumentIcon, CloudArrowUpIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useAppContext, type Document, type Folder } from '@/contexts/AppContext'
import DocumentPreview from './DocumentPreview'

interface DocumentManagerProps {
  selectedFolder?: {type: string, id: string, name: string} | null
  onFolderChange?: (folder: {type: string, id: string, name: string} | null) => void
}

const DocumentManager = forwardRef<any, DocumentManagerProps>(({ selectedFolder: externalSelectedFolder, onFolderChange }, ref) => {
  const { folders, addDocumentToFolder, removeDocumentFromFolder, setFolders } = useAppContext()
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'milestone' | 'dcr'>('all')
  const [isUploading, setIsUploading] = useState(false)
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Clé pour le localStorage
  const STORAGE_KEY = 'ocean-factory-documents'

  // Charger les documents depuis localStorage au démarrage
  useEffect(() => {
    const savedDocuments = localStorage.getItem(STORAGE_KEY)
    if (savedDocuments) {
      try {
        const parsedDocuments = JSON.parse(savedDocuments)
        // Restaurer les documents dans les dossiers
        const updatedFolders = folders.map((folder): Folder => {
          const savedFolder = parsedDocuments.find((f: any) => f.id === folder.id)
          if (savedFolder && savedFolder.documents) {
            return {
              ...folder,
              documents: savedFolder.documents.map((doc: any) => ({
                ...doc,
                dateUpload: new Date(doc.dateUpload)
              }))
            }
          }
          return folder
        })
        setFolders(updatedFolders)
      } catch (error) {
        console.error('Erreur lors du chargement des documents:', error)
      }
    }
  }, [setFolders])

  // Sauvegarder les documents dans localStorage à chaque changement
  useEffect(() => {
    if (folders.length > 0) {
      const foldersWithDocuments = folders.filter(folder => folder.documents.length > 0)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(foldersWithDocuments))
    }
  }, [folders])

  // Sélectionner automatiquement un dossier quand il est passé en props
  useEffect(() => {
    if (externalSelectedFolder && folders.length > 0) {
      const folderId = `${externalSelectedFolder.type}-${externalSelectedFolder.id}`
      const folder = folders.find(f => f.id === folderId)
      if (folder) {
        setSelectedFolder(folder)
      }
    }
  }, [externalSelectedFolder, folders])

  useImperativeHandle(ref, () => ({
    selectFolder: (type: string, id: string) => {
      const folderId = `${type}-${id}`
      const folder = folders.find(f => f.id === folderId)
      if (folder) {
        setSelectedFolder(folder)
      }
    }
  }))

  // Filtrer les dossiers
  const filteredFolders = folders.filter(folder => {
    const matchesSearch = folder.nom.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || folder.type === filterType
    return matchesSearch && matchesType
  })

  // Gérer l'upload de fichiers
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, folderId: string) => {
    const files = event.target.files
    if (!files || !selectedFolder) return

    setIsUploading(true)

    Array.from(files).forEach((file) => {
      // Créer une URL temporaire pour le fichier
      const fileUrl = URL.createObjectURL(file)
      
      const newDocument: Document = {
        id: `doc-${Date.now()}-${Math.random()}`,
        nom: file.name,
        type: file.type,
        taille: file.size,
        dateUpload: new Date(),
        folderId: folderId,
        url: fileUrl
      }

      // Ajouter le document au dossier via le contexte
      addDocumentToFolder(folderId, newDocument)

      // Mettre à jour le dossier sélectionné
      setSelectedFolder(prev => prev ? {
        ...prev,
        documents: [...prev.documents, newDocument]
      } : null)
    })

    setIsUploading(false)
    event.target.value = ''
  }

  // Ouvrir l'aperçu d'un document
  const openDocumentPreview = (document: Document) => {
    setPreviewDocument(document)
    setIsPreviewOpen(true)
  }

  // Fermer l'aperçu
  const closeDocumentPreview = () => {
    setIsPreviewOpen(false)
    setPreviewDocument(null)
  }

  // Gérer la touche Échap pour fermer l'aperçu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isPreviewOpen) {
        closeDocumentPreview()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isPreviewOpen])

  // Supprimer un document
  const deleteDocument = (documentId: string) => {
    if (!selectedFolder) return

    removeDocumentFromFolder(selectedFolder.id, documentId)

    setSelectedFolder(prev => prev ? {
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== documentId)
    } : null)
  }

  // Formater la taille des fichiers
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Gestion des Archives</h2>
        <p className="text-gray-600">
          Organisez et gérez les documents associés à chaque milestone et DCR
        </p>
      </div>

      <div className="flex h-[800px] bg-white rounded-lg shadow-md overflow-hidden">
        {/* Sidebar - Liste des dossiers */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Barre de recherche et filtres */}
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Rechercher un dossier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue"
            />
            
            <div className="flex space-x-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 text-xs rounded-full ${
                  filterType === 'all' 
                    ? 'bg-ocean-blue text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setFilterType('milestone')}
                className={`px-3 py-1 text-xs rounded-full ${
                  filterType === 'milestone' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Milestones
              </button>
              <button
                onClick={() => setFilterType('dcr')}
                className={`px-3 py-1 text-xs rounded-full ${
                  filterType === 'dcr' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                DCR
              </button>
            </div>
          </div>

          {/* Liste des dossiers */}
          <div className="flex-1 overflow-y-auto">
            {filteredFolders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => setSelectedFolder(folder)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedFolder?.id === folder.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <FolderIcon className={`w-5 h-5 mt-0.5 ${
                    folder.type === 'milestone' ? 'text-blue-500' : 'text-orange-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {folder.nom}
                    </p>
                    <p className="text-xs text-gray-500">
                      {folder.documents.length} document(s)
                    </p>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                      folder.type === 'milestone' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {folder.type === 'milestone' ? 'Milestone' : 'DCR'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone principale - Contenu du dossier */}
        <div className="flex-1 flex flex-col">
          {selectedFolder ? (
            <>
              {/* En-tête du dossier */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedFolder.nom}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedFolder.documents.length} document(s) dans ce dossier
                    </p>
                  </div>
                  
                  {/* Bouton d'upload */}
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileUpload(e, selectedFolder.id)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isUploading}
                      title="Sélectionner des fichiers à uploader"
                      aria-label="Sélectionner des fichiers à uploader"
                    />
                    <button
                      disabled={isUploading}
                      className="flex items-center space-x-2 px-4 py-2 bg-ocean-blue text-white rounded-md hover:bg-ocean-dark disabled:opacity-50"
                    >
                      <CloudArrowUpIcon className="w-5 h-5" />
                      <span>{isUploading ? 'Upload...' : 'Ajouter des fichiers'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Liste des documents */}
              <div className="flex-1 overflow-y-auto p-6">
                {selectedFolder.documents.length > 0 ? (
                  <div className="grid gap-4">
                    {selectedFolder.documents.map((document) => (
                      <div
                        key={document.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100"
                      >
                        <div className="flex items-center space-x-3">
                          <DocumentIcon className="w-8 h-8 text-gray-500" />
                          <div>
                            <p className="font-medium text-gray-900">{document.nom}</p>
                            <p className="text-sm text-gray-500">
                              {formatFileSize(document.taille)} • {document.dateUpload.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openDocumentPreview(document)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-md"
                            title="Aperçu du document"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteDocument(document.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-md"
                            title="Supprimer le document"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <DocumentIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      Aucun document
                    </h4>
                    <p className="text-gray-500 mb-4">
                      Ce dossier ne contient aucun document pour le moment.
                    </p>
                    <div className="relative inline-block">
                      <input
                        type="file"
                        multiple
                        onChange={(e) => handleFileUpload(e, selectedFolder.id)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        title="Sélectionner le premier document à ajouter"
                        aria-label="Sélectionner le premier document à ajouter"
                      />
                      <button className="px-4 py-2 bg-ocean-blue text-white rounded-md hover:bg-ocean-dark">
                        Ajouter le premier document
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <FolderIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Sélectionnez un dossier
                </h4>
                <p className="text-gray-500">
                  Choisissez un dossier dans la liste pour voir et gérer ses documents.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Composant d'aperçu des documents */}
      <DocumentPreview
        document={previewDocument}
        isOpen={isPreviewOpen}
        onClose={closeDocumentPreview}
      />
    </div>
  )
})

DocumentManager.displayName = 'DocumentManager'

export default DocumentManager