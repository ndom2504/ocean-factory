'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface DocumentStatus {
  id: string
  nom: string
  type: 'formulaire' | 'import'
  statut: 'vide' | 'en_cours' | 'complete'
  ordre: number
  fichier?: File | null
  contenu?: any
  previewData?: string
}

interface DocumentsContextType {
  documents: DocumentStatus[]
  updateDocument: (id: string, updates: Partial<DocumentStatus>) => void
  getNextAvailableDocument: () => DocumentStatus | null
  isDocumentAccessible: (ordre: number) => boolean
  isAllDocumentsComplete: () => boolean
  getDocumentById: (id: string) => DocumentStatus | undefined
  resetAllDocuments: () => void
}

const DocumentsContext = createContext<DocumentsContextType | undefined>(undefined)

const initialDocuments: DocumentStatus[] = [
  {
    id: 'formulaire-1111',
    nom: 'Formulaire 1111',
    type: 'formulaire',
    statut: 'vide',
    ordre: 1
  },
  {
    id: 'payment-claim',
    nom: 'Payment Claim',
    type: 'formulaire',
    statut: 'vide',
    ordre: 2
  },
  {
    id: 'facture-sap',
    nom: 'Facture SAP',
    type: 'import',
    statut: 'vide',
    ordre: 3
  },
  {
    id: 'courriel-client',
    nom: 'Courriel de confirmation du client',
    type: 'import',
    statut: 'vide',
    ordre: 4
  },
  {
    id: 'documents-annexes',
    nom: 'Documents annexes',
    type: 'import',
    statut: 'vide',
    ordre: 5
  }
]

export function DocumentsProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<DocumentStatus[]>(initialDocuments)

  const updateDocument = (id: string, updates: Partial<DocumentStatus>) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === id ? { ...doc, ...updates } : doc
      )
    )
  }

  const getNextAvailableDocument = () => {
    return documents.find(doc => doc.statut === 'vide') || null
  }

  const isDocumentAccessible = (ordre: number) => {
    // Le premier document est toujours accessible
    if (ordre === 1) return true
    
    // Vérifier que tous les documents précédents sont complets
    const previousDocuments = documents.filter(doc => doc.ordre < ordre)
    return previousDocuments.every(doc => doc.statut === 'complete')
  }

  const isAllDocumentsComplete = () => {
    return documents.every(doc => doc.statut === 'complete')
  }

  const getDocumentById = (id: string) => {
    return documents.find(doc => doc.id === id)
  }

  const resetAllDocuments = () => {
    setDocuments(initialDocuments.map(doc => ({
      ...doc,
      statut: 'vide' as const,
      fichier: null,
      contenu: undefined,
      previewData: undefined
    })))
  }

  return (
    <DocumentsContext.Provider value={{
      documents,
      updateDocument,
      getNextAvailableDocument,
      isDocumentAccessible,
      isAllDocumentsComplete,
      getDocumentById,
      resetAllDocuments
    }}>
      {children}
    </DocumentsContext.Provider>
  )
}

export function useDocuments() {
  const context = useContext(DocumentsContext)
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentsProvider')
  }
  return context
}