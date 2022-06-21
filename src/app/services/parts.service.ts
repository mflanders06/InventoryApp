import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Part, PartsReturned, Unit } from '../components/part';

@Injectable({
  providedIn: 'root'
})
export class PartsService {

  constructor( private apollo: Apollo ) { }

  newPart(partName: string, description: string, unitId: number, vendorId: number ){
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation($partName: String!, $description: String, $unitId: Int!, $vendorId: Int) {
          createPart(partName: $partName, description: $description, unitId: $unitId, vendorId: $vendorId){
            partName
            description
            unitId
            vendorId
          }
        }
      `,
      variables: {
        partName: partName,
        description: description,
        unitId: unitId,
        vendorId: vendorId
      }
    })
  }

  getParts(){
    return this.apollo.query<any>({
      query: gql`
        {
          parts{
            partName
            description
            unitId
            vendorId
          }
        }
      `, fetchPolicy: "no-cache"
    })
  }

  getUnits(){
    return this.apollo.query<any>({
      query: gql`
        {
          units{
            id
            unitName
          }
        }
      `
    })
  }

  getVendors(){
    return this.apollo.query<any>({
      query: gql`
        {
          vendors{
            id
            vendorName
            website
            busPhone
            cellPhone
          }
        }
      `
    })
  }

  getPartsList(){
    return this.apollo.query<any>({
      query: gql`
        {
          fullParts
          {
            id
            partName
            description
            unitName
            vendorName
          }
        }
      `, fetchPolicy: "no-cache"
    })
  }

  editPart(id: number, partName: string, description: string, unitId: number, vendorId: number){
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation($id: Int!, $partName: String!, $$description: String, $unitId: Int!, $vendorId: number)
        {
          editPart(id: $id, partName: $partName, description: $$description, unitId: $unitId, vendorId: $vendorId){
            id
            partName
            description
            unitId
            vendorId
          }
        }
      `,
      variables: {
        id: id,
        partName: partName,
        description: description,
        unitId: unitId,
        vendorId: vendorId
      }
    })
  }

}
