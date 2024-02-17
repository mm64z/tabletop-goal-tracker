import { FC, ReactElement } from "react";
import { View } from "react-native";


interface Parameters {
  id: ID,
}

interface State {
  title: string,
  description: string,
}

export const ListEntry: FC<Parameters> = ({
  id,
}): ReactElement => {
  const { title, description }: State = useSelector(mapStateToProps(id));
  const dispatch = useDispatch();

  return (
     <View style={styles.overall}>
      
    </View>
  )
}

const selectCards = ({ core }: { core: PalState }) => core.allPals;

const mapStateToProps = (id: ID) => {
  return createSelector([selectCards], (allCards) => {
    return {
      title: allCards[id].title,
      description: allCards[id].description,
    }
  })
}

const styles = StyleSheet.create({
  overall: {
    flexDirection: 'row',
  },
});