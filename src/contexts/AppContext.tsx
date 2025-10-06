'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { DocumentsProvider } from './DocumentsContext'

// Interfaces partagées
export interface MilestoneFacturation {
  id: string
  numeroEtape: string
  description: string
  montant: number
  dateEcheance: Date
  statut: 'En attente' | 'Facturé' | 'Payé'
  numeroFacture?: string
  dateFacturation?: Date
}

export interface DCRFacturation {
  id: string
  numeroEtape: string
  description: string
  montant: number
  dateEcheance: Date
  statut: 'En attente' | 'Facturé' | 'Payé'
  numeroFacture?: string
  dateFacturation?: Date
}

export interface Document {
  id: string
  nom: string
  type: string
  taille: number
  dateUpload: Date
  url?: string
  folderId: string
}

export interface Folder {
  id: string
  nom: string
  type: 'milestone' | 'dcr'
  referenceId: string
  documents: Document[]
}

interface AppContextType {
  milestones: MilestoneFacturation[]
  dcrs: DCRFacturation[]
  folders: Folder[]
  setMilestones: (milestones: MilestoneFacturation[]) => void
  setDcrs: (dcrs: DCRFacturation[]) => void
  setFolders: (folders: Folder[]) => void
  addMilestone: (milestone: MilestoneFacturation) => void
  addDCR: (dcr: DCRFacturation) => void
  updateMilestone: (id: string, updates: Partial<MilestoneFacturation>) => void
  updateDCR: (id: string, updates: Partial<DCRFacturation>) => void
  addDocumentToFolder: (folderId: string, document: Document) => void
  removeDocumentFromFolder: (folderId: string, documentId: string) => void
  getDocumentsForItem: (type: 'milestone' | 'dcr', itemId: string) => Document[]
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [milestones, setMilestones] = useState<MilestoneFacturation[]>([])
  const [dcrs, setDcrs] = useState<DCRFacturation[]>([])
  const [folders, setFolders] = useState<Folder[]>([])

  // Fonction pour créer automatiquement les dossiers
  const createFoldersForData = (milestones: MilestoneFacturation[], dcrs: DCRFacturation[]) => {
    const milestoneFolders: Folder[] = milestones.map(milestone => ({
      id: `milestone-${milestone.id}`,
      nom: `${milestone.numeroEtape} - ${milestone.description}`,
      type: 'milestone',
      referenceId: milestone.id,
      documents: []
    }))

    const dcrFolders: Folder[] = dcrs.map(dcr => ({
      id: `dcr-${dcr.id}`,
      nom: `${dcr.numeroEtape} - ${dcr.description}`,
      type: 'dcr',
      referenceId: dcr.id,
      documents: []
    }))

    setFolders([...milestoneFolders, ...dcrFolders])
  }

  // Mettre à jour les dossiers quand les données changent
  useEffect(() => {
    if (milestones.length > 0 || dcrs.length > 0) {
      createFoldersForData(milestones, dcrs)
    }
  }, [milestones, dcrs])

  const addMilestone = (milestone: MilestoneFacturation) => {
    setMilestones(prev => [...prev, milestone])
    // Le dossier sera créé automatiquement via useEffect
  }

  const addDCR = (dcr: DCRFacturation) => {
    setDcrs(prev => [...prev, dcr])
    // Le dossier sera créé automatiquement via useEffect
  }

  const updateMilestone = (id: string, updates: Partial<MilestoneFacturation>) => {
    setMilestones(prev => prev.map(milestone => 
      milestone.id === id ? { ...milestone, ...updates } : milestone
    ))
  }

  const updateDCR = (id: string, updates: Partial<DCRFacturation>) => {
    setDcrs(prev => prev.map(dcr => 
      dcr.id === id ? { ...dcr, ...updates } : dcr
    ))
  }

  const addDocumentToFolder = (folderId: string, document: Document) => {
    setFolders(prev => prev.map(folder => 
      folder.id === folderId 
        ? { ...folder, documents: [...folder.documents, document] }
        : folder
    ))
  }

  const removeDocumentFromFolder = (folderId: string, documentId: string) => {
    setFolders(prev => prev.map(folder => 
      folder.id === folderId
        ? { ...folder, documents: folder.documents.filter(doc => doc.id !== documentId) }
        : folder
    ))
  }

  const getDocumentsForItem = (type: 'milestone' | 'dcr', itemId: string): Document[] => {
    const folderId = `${type}-${itemId}`
    const folder = folders.find(f => f.id === folderId)
    return folder ? folder.documents : []
  }

  return (
    <AppContext.Provider value={{
      milestones,
      dcrs,
      folders,
      setMilestones,
      setDcrs,
      setFolders,
      addMilestone,
      addDCR,
      updateMilestone,
      updateDCR,
      addDocumentToFolder,
      removeDocumentFromFolder,
      getDocumentsForItem
    }}>
      <DocumentsProvider>
        {children}
      </DocumentsProvider>
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}