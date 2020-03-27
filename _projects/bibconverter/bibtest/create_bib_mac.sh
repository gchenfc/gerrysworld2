cp bib_template.tex bib.tex
# note: 8 \'s: 2 for quotes, 2 for sed, 2 for $()
#                          @article{ ... ,           \cite{ ... }
for item in $(sed -n "s/^.*@\(.*\){\(.*\),.*$/\\\\\\\\cite{\2}/p" example_bib.bib)
do
    echo "Bibitem: $item"
    sed -i '' "s,citationcommandsgohere,$item citationcommandsgohere," bib.tex
done
sed -i '' "s,citationcommandsgohere,," bib.tex

pandoc bib.tex --bibliography example_bib.bib -o example_bib.html --csl ieee.csl
open example_bib.html