'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Interfaces pour les données synchronisées
export interface ProjectData {
  id: string // 'c228', 'c229', 'c230', 'c231'
  name: string
  milestones: MilestoneSync[]
  dcrs: DCRSync[]
  registers: RegisterEntry[]
  formAmounts: FormAmount[]
  taxRate: number // Taux de taxe spécifique au projet
}

export interface MilestoneSync {
  id: number
  numeroEtape: string
  description: string
  pourcentage: number
  prixUnitaireFerme: number
  prixFermeTotal: number
  facture: boolean
  projectId: string // Référence au projet (c228, c229, etc.)
}

export interface DCRSync {
  id: number
  numeroEtape: string
  description: string
  pourcentage: number
  prixUnitaireFerme: number
  prixFermeTotal: number
  facture: boolean
  projectId: string
}

export interface RegisterEntry {
  id: number
  type: 'milestone' | 'dcr'
  referenceId: number
  montantFacture: number
  montantTTC: number
  projectId: string
  dateFact: string
}

export interface FormAmount {
  formId: string // 'pwgsc1111', 'paymentclaim', etc.
  projectId: string
  montantHT: number
  montantTTC: number
  taux: number
}

interface PriceSyncContextType {
  projects: ProjectData[]
  updateMilestonePrice: (projectId: string, milestoneId: number, newPrice: number) => void
  updateDCRPrice: (projectId: string, dcrId: number, newPrice: number) => void
  toggleMilestoneFacture: (projectId: string, milestoneId: number) => void
  toggleDCRFacture: (projectId: string, dcrId: number) => void
  calculateTTC: (montantHT: number, taxRate: number) => number
  getTotalsByProject: (projectId: string) => ProjectTotals
  getFormAmountsByProject: (projectId: string) => FormAmount[]
}

export interface ProjectTotals {
  totalMilestonesHT: number
  totalMilestonesTTC: number
  totalDCRsHT: number
  totalDCRsTTC: number
  totalFactureHT: number
  totalFactureTTC: number
  totalContractHT: number
  totalContractTTC: number
}

const PriceSyncContext = createContext<PriceSyncContextType | undefined>(undefined)

// Données initiales des projets
const initialProjects: ProjectData[] = [
  {
    id: 'c228',
    name: 'C-228 NLT1',
    milestones: [],
    dcrs: [],
    registers: [],
    formAmounts: [],
    taxRate: 0.15 // 15% HST
  },
  {
    id: 'c229',
    name: 'C-229 NLT2',
    milestones: [],
    dcrs: [],
    registers: [],
    formAmounts: [],
    taxRate: 0.15
  },
  {
    id: 'c230',
    name: 'C-230 NLT3',
    milestones: [],
    dcrs: [],
    registers: [],
    formAmounts: [],
    taxRate: 0.15
  },
  {
    id: 'c231',
    name: 'C-231 NLT4',
    milestones: [],
    dcrs: [],
    registers: [],
    formAmounts: [],
    taxRate: 0.15
  }
]

export function PriceSyncProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects)

  // Fonction pour calculer le TTC
  const calculateTTC = (montantHT: number, taxRate: number): number => {
    return montantHT * (1 + taxRate)
  }

  // Mettre à jour le prix d'un milestone et synchroniser tout
  const updateMilestonePrice = (projectId: string, milestoneId: number, newPrice: number) => {
    setProjects(prev => prev.map(project => {
      if (project.id !== projectId) return project

      const updatedMilestones = project.milestones.map(milestone => {
        if (milestone.id === milestoneId) {
          const updatedMilestone = { ...milestone, prixUnitaireFerme: newPrice, prixFermeTotal: newPrice }
          
          // Synchroniser avec les registres si facturé
          if (milestone.facture) {
            synchronizeToRegisters(project.id, 'milestone', milestone.id, newPrice, project.taxRate)
            synchronizeToForms(project.id, newPrice, project.taxRate)
          }
          
          return updatedMilestone
        }
        return milestone
      })

      return { ...project, milestones: updatedMilestones }
    }))
  }

  // Mettre à jour le prix d'un DCR et synchroniser tout
  const updateDCRPrice = (projectId: string, dcrId: number, newPrice: number) => {
    setProjects(prev => prev.map(project => {
      if (project.id !== projectId) return project

      const updatedDCRs = project.dcrs.map(dcr => {
        if (dcr.id === dcrId) {
          const updatedDCR = { ...dcr, prixUnitaireFerme: newPrice, prixFermeTotal: newPrice }
          
          // Synchroniser avec les registres si facturé
          if (dcr.facture) {
            synchronizeToRegisters(project.id, 'dcr', dcr.id, newPrice, project.taxRate)
            synchronizeToForms(project.id, newPrice, project.taxRate)
          }
          
          return updatedDCR
        }
        return dcr
      })

      return { ...project, dcrs: updatedDCRs }
    }))
  }

  // Activer/désactiver la facturation d'un milestone
  const toggleMilestoneFacture = (projectId: string, milestoneId: number) => {
    setProjects(prev => prev.map(project => {
      if (project.id !== projectId) return project

      const updatedMilestones = project.milestones.map(milestone => {
        if (milestone.id === milestoneId) {
          const newFactureStatus = !milestone.facture
          const updatedMilestone = { ...milestone, facture: newFactureStatus }
          
          if (newFactureStatus) {
            // Ajouter aux registres
            synchronizeToRegisters(project.id, 'milestone', milestone.id, milestone.prixUnitaireFerme, project.taxRate)
          } else {
            // Retirer des registres
            removeFromRegisters(project.id, 'milestone', milestone.id)
          }
          
          synchronizeToForms(project.id, milestone.prixUnitaireFerme, project.taxRate)
          return updatedMilestone
        }
        return milestone
      })

      return { ...project, milestones: updatedMilestones }
    }))
  }

  // Activer/désactiver la facturation d'un DCR
  const toggleDCRFacture = (projectId: string, dcrId: number) => {
    setProjects(prev => prev.map(project => {
      if (project.id !== projectId) return project

      const updatedDCRs = project.dcrs.map(dcr => {
        if (dcr.id === dcrId) {
          const newFactureStatus = !dcr.facture
          const updatedDCR = { ...dcr, facture: newFactureStatus }
          
          if (newFactureStatus) {
            // Ajouter aux registres
            synchronizeToRegisters(project.id, 'dcr', dcr.id, dcr.prixUnitaireFerme, project.taxRate)
          } else {
            // Retirer des registres
            removeFromRegisters(project.id, 'dcr', dcr.id)
          }
          
          synchronizeToForms(project.id, dcr.prixUnitaireFerme, project.taxRate)
          return updatedDCR
        }
        return dcr
      })

      return { ...project, dcrs: updatedDCRs }
    }))
  }

  // Synchroniser vers les registres
  const synchronizeToRegisters = (projectId: string, type: 'milestone' | 'dcr', referenceId: number, montantHT: number, taxRate: number) => {
    // Cette fonction sera appelée pour mettre à jour les registres
    // Implementation détaillée à venir
    console.log(`Synchronizing to registers: ${projectId}, ${type}, ${referenceId}, ${montantHT}`)
  }

  // Retirer des registres
  const removeFromRegisters = (projectId: string, type: 'milestone' | 'dcr', referenceId: number) => {
    // Cette fonction sera appelée pour retirer des registres
    console.log(`Removing from registers: ${projectId}, ${type}, ${referenceId}`)
  }

  // Synchroniser vers les formulaires
  const synchronizeToForms = (projectId: string, montantHT: number, taxRate: number) => {
    // Cette fonction sera appelée pour mettre à jour les formulaires
    console.log(`Synchronizing to forms: ${projectId}, ${montantHT}`)
  }

  // Calculer les totaux par projet
  const getTotalsByProject = (projectId: string): ProjectTotals => {
    const project = projects.find(p => p.id === projectId)
    if (!project) {
      return {
        totalMilestonesHT: 0,
        totalMilestonesTTC: 0,
        totalDCRsHT: 0,
        totalDCRsTTC: 0,
        totalFactureHT: 0,
        totalFactureTTC: 0,
        totalContractHT: 0,
        totalContractTTC: 0
      }
    }

    const totalMilestonesHT = project.milestones.reduce((sum, m) => sum + m.prixFermeTotal, 0)
    const totalDCRsHT = project.dcrs.reduce((sum, d) => sum + d.prixFermeTotal, 0)
    const totalFactureHT = project.milestones.filter(m => m.facture).reduce((sum, m) => sum + m.prixFermeTotal, 0) +
                          project.dcrs.filter(d => d.facture).reduce((sum, d) => sum + d.prixFermeTotal, 0)
    
    const totalContractHT = totalMilestonesHT + totalDCRsHT

    return {
      totalMilestonesHT,
      totalMilestonesTTC: calculateTTC(totalMilestonesHT, project.taxRate),
      totalDCRsHT,
      totalDCRsTTC: calculateTTC(totalDCRsHT, project.taxRate),
      totalFactureHT,
      totalFactureTTC: calculateTTC(totalFactureHT, project.taxRate),
      totalContractHT,
      totalContractTTC: calculateTTC(totalContractHT, project.taxRate)
    }
  }

  // Obtenir les montants des formulaires par projet
  const getFormAmountsByProject = (projectId: string): FormAmount[] => {
    const project = projects.find(p => p.id === projectId)
    return project?.formAmounts || []
  }

  return (
    <PriceSyncContext.Provider value={{
      projects,
      updateMilestonePrice,
      updateDCRPrice,
      toggleMilestoneFacture,
      toggleDCRFacture,
      calculateTTC,
      getTotalsByProject,
      getFormAmountsByProject
    }}>
      {children}
    </PriceSyncContext.Provider>
  )
}

export function usePriceSync() {
  const context = useContext(PriceSyncContext)
  if (context === undefined) {
    throw new Error('usePriceSync must be used within a PriceSyncProvider')
  }
  return context
}