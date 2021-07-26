import { StyleSheet, StatusBar } from "react-native";

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    marginTop: 5,
    backgroundColor: '#ffbc5d',
  },
  title: {
    fontSize: 20,
  },
  numericals: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonRow: {
    paddingHorizontal: 3,
  },
  addButton: {
    paddingHorizontal: 2,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 5,
    fontSize: 25,
    textTransform: 'capitalize',
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBg: {
    backgroundColor: 'white',
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  title: {
    fontSize: 25,
    margin: 10,
  },
  enterAmount: {
    // height: 40,
    width: 100,
    margin: 10,
    padding: 5,
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
});

const summaryStyles = StyleSheet.create({
  summary: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    // paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: '#ffbc5d',
  },
  summaryTexts: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    // height: '100%',
  },
  summaryItem: {
    fontSize: 26,
  },
  summaryButtons: {
    marginVertical: 2,
  },
});

export { homeStyles, modalStyles, summaryStyles }