import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
} from 'react-native';
// Importamos el componente
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import { generarId } from './src/helpers';
import ListadoGastos from './src/components/ListadoGastos';

const App = () => {
  const [ isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [ presupuesto, setPresupuesto ] = useState(0);

  const [ gastos, setGastos ] = useState( [] );

  const [ modal, setModal ] = useState( false );

  const handleNuevoPresupuesto = (presupuesto) => {
    if (Number(presupuesto) > 0)
    {
      setIsValidPresupuesto(true)
    }
    else
    {
      Alert.alert
      (
        'Error',
        'El presupuesto no puede ser: 0 o menor',
        [
          {
            text: 'OK',
          }
        ]
      );
    }
  };

  const handleGasto = gasto  =>
  {
    // Sin incluye al menos 1 vacío
    if ( Object.values(gasto).includes('') )
    {
      Alert.alert
      (
        "Error",
        "Todos los campos son obligatorios",
      )

      return
    }

    // Añadir el nuevo gasta el STATE
    gasto.id = generarId();

    setGastos( [...gastos, gasto]);

    setModal(!modal);
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.header}>
        {/* Utilizamos el componente */}
        <Header/>

        {
          isValidPresupuesto
            ? (
                <ControlPresupuesto 
                  presupuesto={presupuesto}
                  gastos={gastos}
                />
              )
            : (
                <NuevoPresupuesto 
                  presupuesto={presupuesto}
                  setPresupuesto={setPresupuesto}
                  handleNuevoPresupuesto = {handleNuevoPresupuesto}
                />
              )
        }
      </View>

      {
        isValidPresupuesto &&
        (
          <ListadoGastos 
            gastos={gastos}
          />
        )
      }

      {
        modal &&
        (
          <Modal 
            animationType='slide'
            visible={modal}
            onRequestClose={
              () => {
                setModal(!modal)
              }
            }
          >
            <FormularioGasto 
              setModal={setModal}
              handleGasto={handleGasto}
            />
          </Modal>
        )
      }

      {/* && = Cuando el resultado del OPERADOR TERNARIO es TRUE, mostrará el siguiente código */}
      {
        isValidPresupuesto &&
          (
            <Pressable
              onPress={ () => setModal(!modal) }
            >
              <Image 
                style={styles.imagen}
                source={ require('./src/img/nuevo-gasto.png') }
              />
            </Pressable>
          )
      }
    </View>
  );
};

const styles = StyleSheet.create
(
  {
    contenedor: {
      backgroundColor: '#F5F5F5',
      // Crece todo verticalmente
      flex: 1,
    },

    header: {
      backgroundColor: '#3B82F6',
    },

    imagen: {
      width: 60,
      height: 60,
      position: 'absolute',
      top: 10,
      right: 20,
    },
  }
);

export default App;
