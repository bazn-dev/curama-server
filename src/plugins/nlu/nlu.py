import json
import sys
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.svm import LinearSVC

def prepare_corpus():
    corpus = []
    target_vector = []

    for intent in config:
        for example in intent["examples"]:
            corpus.append(example)
            target_vector.append(intent["name"])

    training_vector = vectorizer.fit_transform(corpus)
    classifier_probability.fit(training_vector, target_vector)
    classifier.fit(training_vector, target_vector)

def get_intent(request):
    best_intent = classifier.predict(vectorizer.transform([request]))[0]

    index_of_best_intent = list(classifier_probability.classes_).index(best_intent)
    probabilities = classifier_probability.predict_proba(vectorizer.transform([request]))[0]

    best_intent_probability = probabilities[index_of_best_intent]

    if best_intent_probability > 0.157:
        return best_intent

def make_preparations():
    global vectorizer, classifier_probability, classifier

    vectorizer = TfidfVectorizer(analyzer="char", ngram_range=(2, 3))
    classifier_probability = LogisticRegression()
    classifier = LinearSVC()
    prepare_corpus()

if __name__ == "__main__":
    voice_input = sys.argv[1]
    config = json.loads(sys.argv[2])

    make_preparations()

    if voice_input:
        voice_input_parts = voice_input.split(" ")

        # если было сказано одно слово - выполняем команду сразу без дополнительных аргументов
        if len(voice_input_parts) == 1:
            intent = get_intent(voice_input)
            if intent:
                print(intent)
                #print(config[intent]["responses"])
            else:
                print(config["failure_phrases"]["response"])

        # в случае длинной фразы - выполняется поиск ключевой фразы и аргументов через каждое слово,
        # пока не будет найдено совпадение
        if len(voice_input_parts) > 1:
            for guess in range(len(voice_input_parts)):
                intent = get_intent((" ".join([voice_input_parts[guess]])).strip())

                if intent:
                    command_options = [voice_input_parts[guess+1:len(voice_input_parts)]]
                    print(intent)
                    print(command_options)
                    # print(config[intent]["responses"])
                    break
                if not intent and guess == len(voice_input_parts)-1:
                    print(config["failure_phrases"]["response"])
